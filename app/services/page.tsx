'use client';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">ATRELLIS</div>
          <button className="px-6 py-2 border border-gray-900 rounded hover:bg-gray-900 hover:text-white transition">
            GET A FAST QUOTE
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            ENGINEERED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
              LUXURY
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From bespoke 3D visualization to smart home integration, we bridge the gap between design philosophy and precise execution.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">ATRELLIS SYSTEMS</h2>
            <p className="text-xl text-gray-600">
              A vertically integrated approach to architectural renovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-5xl font-bold text-gray-300 mb-4">01</div>
              <h3 className="text-2xl font-bold mb-4">Residential Refinement</h3>
              <p className="text-gray-600 mb-6">
                Full-scale luxury condo and landed property renovations tailored to your exacting lifestyle standards.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Space Reconfiguration</li>
                <li>• High-End Surface Finishes</li>
                <li>• Turnkey Interior Fit-outs</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-5xl font-bold text-gray-300 mb-4">02</div>
              <h3 className="text-2xl font-bold mb-4">Architectural A&A</h3>
              <p className="text-gray-600 mb-6">
                Sophisticated Additions and Alterations, managing load-bearing modifications and structural extensions seamlessly.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• BCA Plan Submissions</li>
                <li>• Structural Reinforcement</li>
                <li>• Facade Modernization</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-5xl font-bold text-gray-300 mb-4">03</div>
              <h3 className="text-2xl font-bold mb-4">Commercial Spatial Planning</h3>
              <p className="text-gray-600 mb-6">
                Designing premium offices, boutique spaces, and experiential retail environments optimized for flow and brand presence.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Brand & Identity Mapping</li>
                <li>• Ergonomic Spatial Flow</li>
                <li>• Lighting Architecture</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-5xl font-bold text-gray-300 mb-4">04</div>
              <h3 className="text-2xl font-bold mb-4">Bespoke Carpentry</h3>
              <p className="text-gray-600 mb-6">
                Factory-precision woodwork and architectural built-ins utilizing premium European hardware and laminates.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Custom Walk-in Wardrobes</li>
                <li>• Integrated Kitchens</li>
                <li>• Acoustic Feature Walls</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-5xl font-bold text-gray-300 mb-4">05</div>
              <h3 className="text-2xl font-bold mb-4">Smart Ecosystems</h3>
              <p className="text-gray-600 mb-6">
                Invisible hardwiring and integration of centralized climate, shading, and security systems to elevate daily living.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Somfy Motorization</li>
                <li>• Centralized Interfaces</li>
                <li>• App-controlled Ambience</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="p-8 border border-gray-200 rounded-lg hover:shadow-lg transition">
              <div className="text-5xl font-bold text-gray-300 mb-4">06</div>
              <h3 className="text-2xl font-bold mb-4">Outdoor Living Solutions</h3>
              <p className="text-gray-600 mb-6">
                Transforming balconies and terraces into year-round extensions of your indoor space with climate-resilient elements.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Decking & Landscaping</li>
                <li>• Structural Weatherproofing</li>
                <li>• Climate Integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Get a fast quote tailored to your project requirements.
        </p>
        <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded hover:bg-gray-100 transition">
          GET A FAST QUOTE
        </button>
      </section>
    </main>
  );
}
