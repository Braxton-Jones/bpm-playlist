import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
export default function LandingPage() {
  return (
    <motion.section
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      className="landing-page"
    >
      <motion.h3 initial={{ x: -100 }} animate={{ x: 0 }}>
        Your new way of creating playlists.
      </motion.h3>

      <motion.p>
        <Typewriter
          className="type"
          delay="1"
          onInit={(typewriter) => {
            typewriter
              .typeString(
                'Feeling slowed down when trying to make playlists? Use .set("list") to make organizing your playlists easier!',
              )
              .start();
          }}
        />
      </motion.p>

      <motion.a
        whileHover={{ scale: 1.08, backgroundColor: "#EBEBEB" }}
        className="sign-in_btn"
        href="http://localhost:8888/login"
      >
        Sign In
      </motion.a>

      <motion.div
        animate={{
          background: [
            "#b43aa8",
            "#bf59c9",
            "#af64d0",
            "#ce60dd",
            "#45a6fc",
            "#ce60dd",
            "#917feb",
            "#af64d0",
            "#917feb",
            "#bf59c9",
          ],
          transition: {
            background: {
              duration: 13,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            },
          },
        }}
        className="accent-gradient"
      ></motion.div>
    </motion.section>
  );
}
