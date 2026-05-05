'use client';

import { useState } from 'react';
import { login, signup } from './actions';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const action = isLogin ? login : signup;

    const result = await action(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => { setIsLogin(true); setError(null); }}
          className={`flex-1 pb-3 text-sm font-bold uppercase tracking-widest transition-all ${
            isLogin ? 'text-white border-b-2 border-blue-500' : 'text-white/40 border-b-2 border-transparent hover:text-white/70'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => { setIsLogin(false); setError(null); }}
          className={`flex-1 pb-3 text-sm font-bold uppercase tracking-widest transition-all ${
            !isLogin ? 'text-white border-b-2 border-blue-500' : 'text-white/40 border-b-2 border-transparent hover:text-white/70'
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-white/30 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="w-5 h-5 text-white/30 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {isLogin && (
          <div className="flex justify-end">
            <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">
              Forgot password?
            </a>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {isLogin ? 'Access Account' : 'Initialize Account'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </form>
      
      {!isLogin && (
        <p className="mt-6 text-center text-xs text-white/40">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      )}
    </div>
  );
}
