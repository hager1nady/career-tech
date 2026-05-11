import React from 'react'
import { useFormik } from 'formik'

import { useState } from 'react'

export default function Login() {
   
  const [showPassword, setShowPassword] = useState(false)
  const [serverError, setServerError] = useState('')
  const [loginSuccess, setLoginSuccess] = useState(false)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: async (values, { setSubmitting }) => {
      setServerError('')
      try {
        const response = await authService.login(values)
        const { token } = response.data
        localStorage.setItem('ct_token', token)
        setLoginSuccess(true)
        setTimeout(() => { window.location.href = '/dashboard' }, 1200)
      } catch (error) {
        const msg = error.response?.data?.message || 'Login failed. Please check your credentials.'
        setServerError(msg)
      } finally {
        setSubmitting(false)
      }
    },
  })

  const handleGoogleLogin = async () => {
    try {
      const response = await authService.loginWithGoogle()
      if (response.data?.url) window.location.href = response.data.url
    } catch {
      setServerError('Google login is unavailable. Please try again.')
    }
  }

  if (loginSuccess) {
    return (
      <div className="card ct-card border-0 p-5 text-center" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="d-flex justify-content-center mb-3">
          <div className="success-icon mx-auto">
            <i className="bi bi-check-lg text-white fs-4"></i>
          </div>
        </div>
        <p className="ct-heading fs-5 mb-0">Welcome back! Redirecting…</p>
      </div>
    )
  }

  return ( <>

    {/* MAIN */}
      <main
        className="min-vh-100 d-flex align-items-center"
        style={{ background: '#f5f7fb' }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-center g-5">
            {/* LEFT SIDE */}
            <div className="col-lg-6">
              <div style={{ maxWidth: '500px' }}>
                <h1
                  className="fw-bold mb-3"
                  style={{
                    color: '#0b3b67',
                    fontSize: '52px',
                    lineHeight: '1.2',
                  }}
                >
                  Master your future career path.
                </h1>

                <p
                  className="text-muted mb-4"
                  style={{
                    fontSize: '18px',
                    lineHeight: '1.8',
                  }}
                >
                  Join thousands of students building their tech roadmaps
                  and landing dream jobs with Career Tech.
                </p>

                {/* IMAGE BOX */}
                <div
                  className="overflow-hidden shadow-sm"
                  style={{
                    borderRadius: '18px',
                    background: '#dfeaf5',
                  }}
                >
                    <img src="./src/assets/flat.jpg" className="w-100"/>
                    
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="col-lg-5 d-flex justify-content-center">
              <div
                className="card border-0 shadow-sm p-4 p-md-5"
                style={{
                  width: '100%',
                  maxWidth: '430px',
                  borderRadius: '18px',
                }}
              >
                {/* HEADER */}
                <div className="text-center mb-4">
                  <h2 className="fw-bold mb-2">Welcome Back</h2>

                  <p className="text-muted mb-0">
                    Log in to continue your journey
                  </p>
                </div>

                <form onSubmit={formik.handleSubmit}>
                  {/* ERROR */}
                  {serverError && (
                    <div className="alert alert-danger py-2">
                      {serverError}
                    </div>
                  )}

                  {/* EMAIL */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email</label>

                    <input
                      type="email"
                      name="email"
                      className="form-control py-2"
                      placeholder="Enter your email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </div>

                  {/* PASSWORD */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label fw-semibold mb-0">
                        Password
                      </label>

                      <button
                        type="button"
                        className="btn btn-link p-0 text-decoration-none"
                        style={{ fontSize: '14px' }}
                      >
                        Forget password?
                      </button>
                    </div>

                    <div className="input-group">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className="form-control py-2"
                        placeholder="Enter your password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                      />

                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        <i
                          className={`bi ${
                            showPassword
                              ? 'bi-eye-slash'
                              : 'bi-eye'
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>

                  {/* LOGIN BTN */}
                  <button
                    type="submit"
                    className="btn text-white w-100 py-2 fw-semibold"
                    style={{
                      background: '#0b3b67',
                      borderRadius: '8px',
                    }}
                    disabled={formik.isSubmitting}
                  >
                    {formik.isSubmitting ? 'Logging in...' : 'Log in'}
                  </button>

                  {/* DIVIDER */}
                  <div className="d-flex align-items-center my-4">
                    <hr className="flex-grow-1" />
                    <span className="mx-3 text-muted">OR</span>
                    <hr className="flex-grow-1" />
                  </div>

                  {/* GOOGLE */}
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100 py-2 d-flex align-items-center justify-content-center gap-2"
                    onClick={handleGoogleLogin}
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="google"
                      width="18"
                    />

                    Continue with Google
                  </button>

                  {/* SIGNUP */}
                  <p className="text-center text-muted mt-4 mb-0">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      className="btn btn-link p-0 text-decoration-none fw-semibold"
                    >
                      Sign up for free
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
     </>
  )
}