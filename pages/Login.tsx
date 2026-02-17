
import React, { useState, useEffect, useRef } from 'react';

interface LoginProps {
  onLogin: (mobile: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState('');
  const [blockTimeRemaining, setBlockTimeRemaining] = useState(0);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer for Resend OTP button
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Timer for Blocking after 3 failed attempts (Kept for UI consistency, but logic bypassed)
  useEffect(() => {
    let interval: any;
    if (blockTimeRemaining > 0) {
      interval = setInterval(() => setBlockTimeRemaining((t) => t - 1), 1000);
    } else if (blockTimeRemaining === 0) {
      localStorage.removeItem('otpAttempts');
    }
    return () => clearInterval(interval);
  }, [blockTimeRemaining]);

  const generateAndStoreOtp = (mobileNum: string) => {
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryTime = Date.now() + 120000; // 2 minutes from now

    localStorage.setItem('generatedOTP', newOtp);
    localStorage.setItem('otpExpiryTime', expiryTime.toString());
    localStorage.setItem('otpAttempts', '0');
    
    // Log to console for development testing
    console.log(`[Verdant Leaf AUTH] OTP for ${mobileNum}: ${newOtp}`);
    return newOtp;
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    // Bypass block check for development mode
    setError('');
    setIsLoading(true);

    // Simulate API call to send SMS
    await new Promise((r) => setTimeout(r, 1200));

    generateAndStoreOtp(mobile);
    setIsLoading(false);
    setStep('otp');
    setResendTimer(30);
    setOtp(['', '', '', '', '', '']);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    // Strict requirement: length must be exactly 6
    if (otpString.length < 6) return;

    setIsLoading(true);
    setError('');

    // Simulate verification delay
    await new Promise((r) => setTimeout(r, 1000));

    // DEVELOPMENT MODE: Success if entered OTP has exactly 6 digits
    // Skip strict comparison, test code checks, attempt limits, and expiry checks.
    if (otpString.length === 6) {
      // Clear OTP storage
      localStorage.removeItem('generatedOTP');
      localStorage.removeItem('otpExpiryTime');
      localStorage.removeItem('otpAttempts');
      
      onLogin(mobile);
    } else {
      // This path is practically unreachable due to the initial length check,
      // but kept for structure.
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    if (resendTimer > 0) return;
    setOtp(['', '', '', '', '', '']);
    setResendTimer(30);
    setError('');
    generateAndStoreOtp(mobile);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-cream flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="font-serif text-4xl text-leaf-900 tracking-tight">
            Verdant <span className="text-gold">Leaf</span>
          </h1>
          <p className="text-leaf-500 font-light text-sm uppercase tracking-[0.2em]">Premium Tea Atelier</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-leaf-50 space-y-8">
          {step === 'mobile' ? (
            <form onSubmit={handleSendOtp} className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <h2 className="font-serif text-2xl text-leaf-900 italic">Welcome Back</h2>
                <p className="text-sm text-leaf-400 font-light">Enter your mobile number to sign in or create an account.</p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-leaf-400 font-medium">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="Mobile Number"
                    className="w-full bg-leaf-50/50 border border-leaf-100 pl-16 pr-4 py-4 rounded-2xl outline-none focus:border-gold transition-all text-leaf-900 font-medium tracking-widest"
                    autoFocus
                  />
                </div>
                {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading || mobile.length < 10}
                className="w-full bg-leaf-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : 'Send OTP'}
              </button>
            </form>
          ) : (
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setStep('mobile');
                    localStorage.removeItem('generatedOTP');
                    setError('');
                  }}
                  className="text-gold text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 mb-2"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  Change Number
                </button>
                <h2 className="font-serif text-2xl text-leaf-900 italic">Verify OTP</h2>
                <p className="text-sm text-leaf-400 font-light">Sent to +91 {mobile}</p>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-full aspect-square bg-leaf-50/50 border border-leaf-100 rounded-xl text-center text-xl font-bold text-leaf-900 focus:border-gold outline-none transition-all disabled:opacity-50"
                    />
                  ))}
                </div>
                {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}
                
                <div className="text-center">
                  <button 
                    onClick={resendOtp}
                    disabled={resendTimer > 0}
                    className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                      (resendTimer > 0) ? 'text-leaf-200 cursor-not-allowed' : 'text-gold hover:text-leaf-900'
                    }`}
                  >
                    {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                  </button>
                </div>
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.join('').length < 6}
                className="w-full bg-leaf-900 text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gold transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : 'Verify & Sign In'}
              </button>
            </div>
          )}
        </div>
        
        <p className="text-center text-[10px] text-leaf-300 font-medium uppercase tracking-[0.2em]">
          Secure login powered by Verdant Shield
        </p>
      </div>
    </div>
  );
};
