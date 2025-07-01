{/* Hero Section */}
<section className="relative bg-gradient-to-br from-brand-navy via-purple-900 to-brand-navy text-white overflow-hidden min-h-screen flex items-center">
{/* Background Pattern */}
<div className="absolute inset-0 opacity-20">
  <div className="absolute inset-0" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
  }}></div>
</div>

{/* Gradient Overlay */}
<div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-transparent"></div>

<div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    {/* Left Content */}
    <div className="animate-slide-in-left">
      {/* PhotoClinch Logo */}
      <div className="mb-8">
        <img 
          src="/logo.png" 
          alt="PhotoClinch - India's #1 Photography Platform" 
          className="h-16 w-auto mb-6"
        />
      </div>

      {/* Social Proof Badge */}
      <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-8 border border-white/20">
        <Star className="w-4 h-4 text-yellow-400 mr-2" />
        <span className="text-sm font-medium">Trusted by 50,000+ clients across India</span>
      </div>

      {/* Main Headline - SEO Optimized */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
        India's #1 
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-pink-400 to-brand-primary animate-pulse">
          Phototech Platform
        </span>
      </h1>
      
      {/* Rest of your existing content stays the same... */}
      <h2 className="text-xl md:text-2xl text-purple-100 mb-8 leading-relaxed font-medium">
        Hire Top Photographers in Minutes • AI-Powered Matching • 
        <span className="text-white font-semibold"> Instant Booking</span> • 
        Quality Guaranteed
      </h2>
      
      {/* Value Proposition */}
      <p className="text-lg text-purple-200 mb-10 leading-relaxed max-w-xl">
        From weddings to corporate events, connect with India's best photographers instantly. 
        No more endless searching or price haggling - just perfect photos, delivered on time.
      </p>
      
      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <Link to={user ? '/dashboard' : '/signup'}>
          <Button 
            variant="primary" 
            size="xl" 
            className="bg-brand-primary hover:bg-blue-600 text-white shadow-2xl hover:shadow-brand transform hover:scale-105 transition-all duration-300 border-0"
          >
            <Camera className="mr-3 h-6 w-6" />
            {user ? 'Find Photographers' : 'Book a Photographer'}
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </Link>
        <Link to="/how-it-works">
          <Button 
            variant="outline" 
            size="xl" 
            className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm hover:border-white/50 transition-all duration-300"
          >
            <Play className="mr-3 h-5 w-5" />
            See How It Works
          </Button>
        </Link>
      </div>
      
      {/* Trust Indicators */}
      <div className="flex flex-wrap items-center gap-6 text-purple-200">
        <div className="flex items-center">
          <CheckCircle className="h-5 w-5 mr-2 text-brand-mint" />
          <span className="text-sm font-medium">Free to browse</span>
        </div>
        <div className="flex items-center">
          <Shield className="h-5 w-5 mr-2 text-blue-400" />
          <span className="text-sm font-medium">Verified professionals</span>
        </div>
        <div className="flex items-center">
          <Zap className="h-5 w-5 mr-2 text-yellow-400" />
          <span className="text-sm font-medium">Instant booking</span>
        </div>
      </div>
    </div>

    {/* Right Content - Hero Image (unchanged) */}
    <div className="animate-slide-in-right">
      <div className="relative">
        {/* Main Hero Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
          <img 
            src="https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2" 
            alt="Professional photographer capturing moments - India's best photography platform" 
            className="w-full h-[500px] object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>

        {/* Floating Stats Card */}
        <div className="absolute -bottom-6 -left-6 bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-2xl animate-float border border-white/20">
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="ml-2 font-bold text-brand-navy text-lg">4.9</span>
          </div>
          <p className="text-brand-navy font-semibold">50,000+ satisfied clients</p>
          <p className="text-gray-500 text-sm">Average response time: 2 minutes</p>
        </div>

        {/* Floating Booking Card */}
        <div className="absolute -top-6 -right-6 bg-brand-mint p-4 rounded-xl shadow-2xl text-white animate-pulse">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 mr-2" />
            <div>
              <p className="font-bold">Just Booked!</p>
              <p className="text-sm opacity-90">Wedding in Mumbai</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

{/* Scroll Indicator */}
<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
  </div>
</div>
</section>