import React from "react";
import { useInView, motion } from "framer-motion";

const VideoSection = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50% 0px" });

  return (
    <div className="h-full px-6 my-10">
      <motion.div
        className="w-full h-full object-contain px-10 py-24 flex justify-center items-center bg-cuero"
        ref={ref}
        initial={{ y: 100, opacity: 1 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1 }}
      >
        <video
          // className="w-full h-full object-contain px-10 py-24"
          src="/videoaleste.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
      </motion.div>
    </div>
  );
};

export default VideoSection;
