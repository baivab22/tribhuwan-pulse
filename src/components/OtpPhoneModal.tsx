import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, LockKeyhole, Phone } from 'lucide-react';

interface OtpPhoneModalProps {
  onVerified: (phone: string, token: string) => void;
  isOpen: boolean;
}

const OtpPhoneModal: React.FC<OtpPhoneModalProps> = ({ onVerified, isOpen }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const otpInputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  // Nepali labels
  const labels = {
    enterPhone: 'फोन नम्बर लेख्नुहोस्',
    sendOtp: 'ओटीपी पठाउनुहोस्',
    enterOtp: 'ओटीपी कोड लेख्नुहोस्',
    verify: 'प्रमाणित गर्नुहोस्',
    resend: 'फेरि पठाउनुहोस्',
    verifying: 'प्रमाणित गर्दै...',
    sending: 'पठाउँदै...',
    invalid: 'फोन नम्बर मिलेन',
    otpSent: 'ओटीपी पठाइयो',
    otpInvalid: 'ओटीपी मिलेन',
    verified: 'फोन नम्बर प्रमाणित भयो',
    wait: 'सेकेन्ड कुर्नुहोस्',
    step1: 'फोन नम्बर प्रविष्ट गर्नुहोस्',
    step2: 'ओटीपी पठाउनुहोस्',
    step3: 'ओटीपी प्रमाणित गर्नुहोस्',
    instruction: 'तपाईंको फोन नम्बरमा ओटीपी पठाइनेछ।',
    otpInstruction: 'ओटीपी कोड तल लेख्नुहोस्',
    changeNumber: 'नम्बर परिवर्तन गर्नुहोस्',
  };

  // Simulate API
  const sendOtp = async () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      setSent(true);
      setStep('otp');
      setCooldown(30);
      setOtp(['', '', '', '', '']);
      if (otpInputs[0].current) otpInputs[0].current.focus();
    }, 1000);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setError('');
    setTimeout(() => {
      setLoading(false);
      if (otp.join('') === '12345') {
        onVerified(phone, 'dummy-token');
      } else {
        setError(labels.otpInvalid);
      }
    }, 1000);
  };

  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Handle OTP input focus and value
  const handleOtpChange = (idx: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < otpInputs.length - 1) {
      otpInputs[idx + 1].current?.focus();
    }
    if (!value && idx > 0) {
      otpInputs[idx - 1].current?.focus();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Card className="w-full max-w-md p-0 rounded-2xl shadow-xl">
        <CardContent className="flex flex-col gap-0 items-center p-0">
          {/* Stepper */}
          <div className="w-full flex justify-between items-center px-8 pt-8 pb-2">
            <div className={`flex-1 text-center ${step === 'phone' ? 'font-bold text-blue-700' : 'text-gray-400'}`}>{labels.step1}</div>
            <div className="w-8 h-1 bg-gray-200 mx-2 rounded-full" />
            <div className={`flex-1 text-center ${step === 'otp' ? 'font-bold text-blue-700' : 'text-gray-400'}`}>{labels.step3}</div>
          </div>
          {/* Icon */}
          <div className="flex flex-col items-center pt-2 pb-4">
            <div className="rounded-full bg-blue-100 p-3 mb-2">
              {step === 'phone' ? <Phone className="h-8 w-8 text-blue-600" /> : <LockKeyhole className="h-8 w-8 text-blue-600" />}
            </div>
            <div className="font-bold text-lg mb-1">{step === 'phone' ? labels.enterPhone : labels.enterOtp}</div>
            <div className="text-sm text-gray-500 mb-2">{step === 'phone' ? labels.instruction : `+९७७-${phone} मा पठाइएको ओटीपी कोड तल लेख्नुहोस्।`}</div>
          </div>
          {/* Phone Step */}
          {step === 'phone' && (
            <div className="w-full flex flex-col items-center gap-2 px-8 pb-6">
              <input
                type="tel"
                placeholder="९८xxxxxxxx"
                value={phone}
                onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                className="text-center text-lg border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:border-blue-500 focus:outline-none"
                maxLength={10}
                disabled={loading}
              />
              <Button
                className="w-full mt-2"
                disabled={loading || phone.length !== 10}
                onClick={sendOtp}
              >
                {loading ? <Loader2 className="animate-spin" /> : labels.sendOtp}
              </Button>
              <button
                type="button"
                className="text-xs text-blue-600 underline mt-1"
                onClick={() => setPhone('')}
                disabled={loading}
              >
                {labels.changeNumber}
              </button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          )}
          {/* OTP Step */}
          {step === 'otp' && (
            <div className="w-full flex flex-col items-center gap-2 px-8 pb-6">
              <div className="flex justify-center gap-2 mb-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={otpInputs[idx]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    className="w-12 h-12 text-center text-2xl border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none font-mono"
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
                        otpInputs[idx - 1].current?.focus();
                      }
                      if (e.key === 'ArrowLeft' && idx > 0) {
                        otpInputs[idx - 1].current?.focus();
                      }
                      if (e.key === 'ArrowRight' && idx < otp.length - 1) {
                        otpInputs[idx + 1].current?.focus();
                      }
                    }}
                    disabled={loading}
                  />
                ))}
              </div>
              <Button
                className="w-full mt-2"
                disabled={loading || otp.some(d => d === '')}
                onClick={verifyOtp}
              >
                {loading ? <Loader2 className="animate-spin" /> : labels.verify}
              </Button>
              <Button
                variant="ghost"
                className="w-full mt-2"
                disabled={cooldown > 0}
                onClick={sendOtp}
              >
                {labels.resend} {cooldown > 0 && `(${cooldown} ${labels.wait})`}
              </Button>
              <button
                type="button"
                className="text-xs text-blue-600 underline mt-1"
                onClick={() => {
                  setStep('phone');
                  setSent(false);
                  setOtp(['', '', '', '', '']);
                }}
                disabled={loading}
              >
                {labels.changeNumber}
              </button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OtpPhoneModal;
