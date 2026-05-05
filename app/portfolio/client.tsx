'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SiteNav from '@/app/components/SiteNav';
import SiteFooter from '@/app/components/SiteFooter';
import { PortfolioRepository } from '@/lib/repositories/portfolio-repository';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PORTFOLIO_PROJECTS = PortfolioRepository.findAll();

export default function PortfolioPageClient() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<Element>('.portfolio-reveal').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el as Element,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white">
      <SiteNav breadcrumb="portfolio" />

      {/* Hero */}
      <section className="pt-44 pb-24 px-8 max-w-7xl mx-auto portfolio-reveal">
        <span className="text-blue-500 font-bold tracking-[4px] uppercase text-xs block mb-6">
          Case Studies
        </span>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-8">
          REAL<br />
          <span className="text-white/20">TRANSFORMATIONS</span>
        </h1>
        <p className="text-white/50 text-lg max-w-xl leading-relaxed">
          Every project is a case study in precision — from concept drawings to BCA-compliant
          final sign-off. Browse our completed works below.
        </p>
      </section>

      {/* Project Grid */}
      <section className="px-8 max-w-7xl mx-auto pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {PORTFOLIO_PROJECTS.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="portfolio-reveal group block rounded-[32px] overflow-hidden glass-panel hover:border-white/20 transition-all duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.6)] no-underline"
              id={`portfolio-card-${project.slug}`}
            >
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Category tag */}
                <span className="absolute top-6 left-6 text-[0.6rem] uppercase tracking-[3px] font-bold px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white/70">
                  {project.category}
                </span>
                {/* VOST */}
                <span className="absolute bottom-6 right-6 text-[0.65rem] uppercase tracking-[2px] font-black px-4 py-2 bg-blue-500/20 border border-blue-500/40 rounded-full text-blue-300">
                  Est. {project.vost}
                </span>
              </div>

              {/* Info */}
              <div className="p-10">
                <p className="text-white/30 text-[0.65rem] uppercase tracking-[3px] mb-3">{project.location}</p>
                <h2 className="text-3xl font-black tracking-tight mb-4 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-white/50 leading-relaxed text-sm mb-8">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.6rem] uppercase tracking-[1px] px-3 py-1 border border-white/10 rounded-full text-white/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="text-[0.65rem] uppercase tracking-[3px] text-blue-500 font-black opacity-40 group-hover:opacity-100 transition-opacity">
                  View Transformation →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* More coming soon note */}
        <div className="portfolio-reveal mt-20 p-12 glass-panel rounded-[32px] text-center">
          <p className="text-white/20 text-sm uppercase tracking-[4px] mb-4">More Case Studies</p>
          <p className="text-white/40 max-w-md mx-auto leading-relaxed">
            Additional project documentation is in preparation. Contact us directly to discuss
            comparable completed works across your property type.
          </p>
          <Link
            href="/quotation"
            className="inline-block mt-8 text-[0.7rem] uppercase tracking-[3px] text-blue-500 font-black hover:text-blue-400 transition-colors"
          >
            Start Your Assessment →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
