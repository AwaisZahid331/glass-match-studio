import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Heart, Globe, Lightbulb } from 'lucide-react';
import { SmallFloatingShape } from '@/components/3d/FloatingShape';

export function MissionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="mission" className="py-24 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute right-0 top-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-medium mb-4"
            >
              Our Mission
            </motion.span>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight">
              Making Image Analysis{' '}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Accessible to Everyone
              </span>
            </h2>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              We believe that advanced computer vision technology shouldn't be limited to 
              large corporations with dedicated research teams. Our mission is to democratize 
              image matching and analysis, making powerful AI tools accessible to developers, 
              researchers, and businesses of all sizes.
            </p>

            <div className="space-y-6">
              {[
                {
                  icon: Target,
                  title: 'Precision First',
                  description: 'We prioritize accuracy in every algorithm we develop.',
                },
                {
                  icon: Heart,
                  title: 'User-Centric Design',
                  description: 'Built with developers and end-users in mind.',
                },
                {
                  icon: Globe,
                  title: 'Global Impact',
                  description: 'Serving users across 150+ countries worldwide.',
                },
                {
                  icon: Lightbulb,
                  title: 'Continuous Innovation',
                  description: 'Always pushing the boundaries of what is possible.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Floating 3D Shape */}
              <SmallFloatingShape className="absolute inset-0" />
              
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 rounded-full border border-dashed border-primary/20"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-16 rounded-full border border-dashed border-secondary/20"
              />
              
              {/* Corner Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-0 right-0 glass-card p-3"
              >
                <div className="text-2xl font-display font-bold text-primary">150+</div>
                <div className="text-xs text-muted-foreground">Countries</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute bottom-0 left-0 glass-card p-3"
              >
                <div className="text-2xl font-display font-bold text-secondary">24/7</div>
                <div className="text-xs text-muted-foreground">Support</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
