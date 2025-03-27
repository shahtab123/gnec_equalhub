import { motion } from "framer-motion";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Gamepad2, Brain, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export function PlayMode() {
  const router = useRouter();

  const cards = [
    {
      title: "Educational mini-games",
      description: "Interactive games that teach about gender equality and social inclusion through engaging gameplay mechanics.",
      icon: Gamepad2,
      color: "red" as const,
      route: "/play/mini-games"
    },
    {
      title: "Ice Breaking",
      description: "Fun and interactive group activities that break barriers and teach equality through play and teamwork.",
      icon: Users,
      color: "blue" as const,
      route: "/play/ice-breaking"
    },
    {
      title: "Coming Soon",
      description: "A new exciting mode that will bring more interactive ways to learn about equality and inclusion. Stay tuned!",
      icon: Brain,
      color: "purple" as const,
      route: "#",
      isComingSoon: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => !card.isComingSoon && router.push(card.route)}
          className={card.isComingSoon ? "cursor-not-allowed" : "cursor-pointer"}
        >
          <CardSpotlight className="h-full p-6 relative" color={card.color}>
            <div className={`space-y-4 ${card.isComingSoon ? "blur-sm" : ""}`}>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-3">
                  <card.icon className="w-6 h-6 text-foreground" />
                  <h2 className="text-xl font-semibold text-foreground">{card.title}</h2>
                </div>
              </div>
              <p className="text-foreground/80">{card.description}</p>
              <div className="pt-4">
                <motion.button
                  whileHover={!card.isComingSoon ? { scale: 1.02 } : {}}
                  whileTap={!card.isComingSoon ? { scale: 0.98 } : {}}
                  className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-foreground transition-colors duration-300"
                >
                  {card.isComingSoon ? "Coming Soon" : "Explore"}
                </motion.button>
              </div>
            </div>
            {card.isComingSoon && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-2xl font-bold text-purple-400 bg-background/80 px-6 py-3 rounded-full border border-purple-500/30">
                  Coming Soon!
                </div>
              </div>
            )}
          </CardSpotlight>
        </motion.div>
      ))}
    </div>
  );
} 