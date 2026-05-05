import { Metadata } from 'next';
import SiteNav from '../components/SiteNav';
import SiteFooter from '../components/SiteFooter';
import LoginForm from './LoginForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login | Atrellis',
  description: 'Access your Atrellis dashboard.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col font-sans selection:bg-blue-500/30">
      <SiteNav ctaLabel="Contact Sales" ctaHref="/quotation" breadcrumb="Portal" />
      
      <div className="flex-1 flex items-center justify-center relative pt-24 pb-12 px-4">
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[150px] mix-blend-screen" />
          <div className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-20 mix-blend-overlay" />
        </div>

        {/* Login Container */}
        <div className="relative w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Branding / Context */}
          <div className="hidden lg:flex flex-col gap-8">
            <Image 
              src="/assets/trustbar_logos/atrellis_brand_nobg.png" 
              alt="Atrellis Logo" 
              width={200} 
              height={60} 
              className="h-[40px] w-auto object-contain opacity-80"
            />
            <div>
              <h1 className="text-4xl xl:text-6xl font-black tracking-tighter leading-[1.1] mb-6">
                Manage your<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">projects & assets.</span>
              </h1>
              <p className="text-white/60 text-lg max-w-md leading-relaxed">
                Access your personalized dashboard to track project timelines, review design proposals, and manage your Atrellis installations.
              </p>
            </div>
            
            <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-black flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md" />
                  </div>
                ))}
              </div>
              <p className="text-sm font-medium text-white/50">
                Join <span className="text-white font-bold">200+</span> premium clients
              </p>
            </div>
          </div>

          {/* Right Column: Form Panel */}
          <div className="w-full">
            <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
              {/* Subtle top edge highlight */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              
              <div className="lg:hidden mb-8 flex justify-center">
                <Image 
                  src="/assets/trustbar_logos/atrellis_brand_nobg.png" 
                  alt="Atrellis Logo" 
                  width={150} 
                  height={45} 
                  className="h-[30px] w-auto object-contain opacity-80"
                />
              </div>

              <LoginForm />
            </div>
          </div>

        </div>
      </div>

      <SiteFooter />
    </main>
  );
}
