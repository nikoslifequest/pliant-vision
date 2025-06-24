import React, { useState, useEffect } from 'react'
import { Eye, EyeSlash } from 'phosphor-react'
import { Button, Input } from '../design-system'
import pliantLogo from '../assets/images/pliantlogo.svg'
import Lottie from 'lottie-react'
import cardsAnimation from '../assets/lottie/CardsInOut.json'

interface LoginProps {
  onLogin: () => void
}

const Login = ({ onLogin }: LoginProps) => {
  const [showWelcome, setShowWelcome] = useState(true)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    // Welcome text animation sequence
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(false)
    }, 2500) // Show welcome for 2.5 seconds

    const formTimer = setTimeout(() => {
      setShowLoginForm(true)
    }, 3500) // Show form after welcome fades out

    return () => {
      clearTimeout(welcomeTimer)
      clearTimeout(formTimer)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password })
    
    // Show loading animation
    setShowLoginForm(false)
    setShowLoadingAnimation(true)
    
    // After animation completes, go to dashboard
    setTimeout(() => {
      onLogin()
    }, 3000) // Wait for animation to complete
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Welcome Text Only */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 ${
        showWelcome 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 -translate-y-8'
      }`}>
        <h1 className="text-4xl font-semibold text-pliant-charcoal tracking-normal animate-fade-in-up">
          Welcome to Pliant
        </h1>
      </div>

      {/* Login Form */}
      <div className={`w-full max-w-md transition-all duration-1000 delay-300 ${
        showLoginForm 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}>
        
        {/* Logo */}
        <div className="text-center mb-12">
          <img src={pliantLogo} alt="Pliant" className="h-12 w-auto mx-auto mb-4" />
          <p className="text-pliant-charcoal/60 text-sm">Login to your account.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-pliant-charcoal mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-pliant-charcoal mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pliant-charcoal/60 hover:text-pliant-charcoal transition-colors"
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              className="text-sm text-pliant-blue hover:text-pliant-blue/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
          >
            Login
          </Button>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-pliant-sand/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-pliant-charcoal/60">or</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-3"
            >
              <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span>Login with Google</span>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full flex items-center justify-center space-x-3"
            >
              <div className="w-5 h-5 bg-pliant-blue rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">SSO</span>
              </div>
              <span>Login with SSO</span>
            </Button>
          </div>

        </form>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-pliant-charcoal/40">
            © 2024 Pliant. All rights reserved.
          </p>
        </div>

      </div>

      {/* Loading Animation Screen */}
      {showLoadingAnimation && (
        <div className="absolute inset-0 flex items-center justify-center bg-white transition-all duration-1000 opacity-100">
          <div className="w-80 h-80">
            <Lottie 
              animationData={cardsAnimation} 
              loop={false}
              autoplay={true}
              className="w-full h-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Login 