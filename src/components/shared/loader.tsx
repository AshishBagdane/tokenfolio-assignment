import { motion } from "framer-motion";

export default function Loader() {
  const box = {
    width: 100,
    height: 100,
    backgroundColor: "#875bef",
    borderRadius: 5,
  };

  return (
    <div className="flex flex-col h-screen w-full items-center justify-center">
      <motion.div
        style={box}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
      />
      <span className="p-4">Loading...</span>
    </div>
  );
}
