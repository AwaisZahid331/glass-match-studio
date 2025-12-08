import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Eye, Fingerprint, Gauge } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Advanced Detection',
    description: 'Our algorithms detect subtle similarities between images that human eyes might miss.',
    color: 'primary',
  },
  {
    icon: Fingerprint,
    title: 'Unique Matching',
    description: 'Identify duplicates, near-duplicates, and visually similar images with precision.',
    color: 'secondary',
  },
  {
    icon: Layers,
    title: 'Multiple Algorithms',
    description: 'Choose from ORB, AKAZE, CLIP, or hybrid methods based on your needs.',
    color: 'primary',
  },
  {
    icon: Gauge,
    title: 'Real-time Results',
    description: 'Get instant feedback with detailed similarity scores and visual overlays.',
    color: 'secondary',
  },
];

export function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4"
          >
            About Our Technology
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Powered by{' '}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cutting-Edge AI
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We combine traditional computer vision with modern deep learning to deliver 
            unmatched accuracy in image matching and comparison.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="glass-card-hover h-full p-6 group">
                <div
                  className={`w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all duration-300 ${
                    feature.color === 'primary'
                      ? 'bg-primary/10 group-hover:bg-primary/20 group-hover:shadow-[0_0_30px_hsl(var(--primary)/0.3)]'
                      : 'bg-secondary/10 group-hover:bg-secondary/20 group-hover:shadow-[0_0_30px_hsl(var(--secondary)/0.3)]'
                  }`}
                >
                  <feature.icon
                    className={`w-7 h-7 ${
                      feature.color === 'primary' ? 'text-primary' : 'text-secondary'
                    }`}
                  />
                </div>
                <h3 className="text-lg font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 glass-card p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '4+', label: 'Matching Algorithms' },
              { value: '50ms', label: 'Avg. Response Time' },
              { value: '1M+', label: 'Images Processed' },
              { value: '99.7%', label: 'User Satisfaction' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
