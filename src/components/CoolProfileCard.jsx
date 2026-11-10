import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaReact, FaPython } from 'react-icons/fa';
import { SiFlutter, SiUnity } from 'react-icons/si';

/**
 * Komponen CoolProfileCard
 * Menampilkan foto profil dengan kartu 3D Tilt dan ikon-ikon teknologi yang mengambang.
 *
 * @param {string} photoProfil - Path atau URL ke foto profil Anda.
 */
const CoolProfileCard = ({ photoProfil }) => {

  // 1. Data Ikon Teknologi
  // Anda bisa mengubah ikon, warna, dan posisinya di sini.
  const techIcons = [
    {
      Icon: FaReact, // Gunakan ikon dari react-icons
      color: 'text-[#61DAFB]', // Warna neon ikon
      position: 'top-[-5%] left-[-10%]', // Posisi absolut relatif terhadap kartu profil
      index: 0
    },
    {
      Icon: SiFlutter,
      color: 'text-[#02569B]',
      position: 'top-[-5%] right-[-10%]',
      index: 1
    },
    {
      Icon: FaPython,
      color: 'text-[#3776AB]',
      position: 'bottom-[-5%] left-[-10%]',
      index: 2
    },
    {
      Icon: SiUnity,
      color: 'text-[#FFFFFF]', // Putih untuk Unity
      position: 'bottom-[-5%] right-[-10%]',
      index: 3
    },
  ];

  // 2. Varian Animasi Framer Motion untuk Efek Mengambang (Floating)
  // Membuat setiap ikon mengambang dengan durasi dan pergerakan yang sedikit berbeda agar alami.
  const floatingVariants = {
    animate: (i) => ({
      y: [0, -15, 0], // Bergerak naik turun
      x: [0, i % 2 === 0 ? 10 : -10, 0], // Sedikit bergerak kiri kanan
      rotate: [0, i % 2 === 0 ? 5 : -5, 0], // Sedikit berputar
      transition: {
        y: {
          duration: 3 + i * 0.2, // Durasi sedikit berbeda
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        x: {
          duration: 4 + i * 0.3,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
        rotate: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }
      },
    }),
  };

  // 3. Varian Animasi untuk Efek Cahaya Neon Berdenyut (Pulse Glow)
  const floatingPulseGlowVariants = {
    pulse: {
      boxShadow: [
        '0 0 15px -5px rgba(30,132,138,0.5)',
        '0 0 35px 0px rgba(30,132,138,0.8)',
        '0 0 15px -5px rgba(30,132,138,0.5)',
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }
    }
  }

  return (
    // Wadah Luar Utama
    <div className="flex justify-center items-center w-full p-4 sm:p-6 md:p-10 mt-2 sm:mt-4 md:mt-10">

      {/* ponytail: responsive container — 220px mobile, 400px desktop */}
      <div className="relative group w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[340px] md:h-[340px] lg:w-[400px] lg:h-[400px]">

        {/* =======================================================
            Kartu Profil Utama dengan React Parallax Tilt (Efek 3D)
            ======================================================= */}
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} perspective={1000} className="w-full h-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-[#10192C] to-[#0A0D14] border border-[#1A263D]
                       shadow-[0_0_60px_-15px_rgba(30,132,138,0.5)] flex justify-center items-center p-1.5 sm:p-2 relative cursor-pointer"
          >
            {/* Efek Cahaya Neon di sekeliling kartu saat di-hover */}
            <div className="absolute inset-0 rounded-3xl group-hover:shadow-[0_0_80px_10px_rgba(30,132,138,0.6)] transition-shadow duration-300 z-0"></div>

            {/* Foto Profil Anda */}
            <img
              src={photoProfil}
              alt="Photo Profile"
              className="w-[95%] h-[95%] rounded-3xl object-cover object-top border-2 sm:border-4 border-[#0F182A] relative z-10"
            />
          </motion.div>
        </Tilt>

        {/* =======================================================
            Ikon-ikon Mengambang (Menggunakan Framer Motion)
            ======================================================= */}
        {techIcons.map(({ Icon, color, position, index }) => (
          <motion.div
            key={index}
            custom={index} // Mengirim index ke varian untuk variasi durasi
            variants={floatingVariants}
            animate="animate"
            // Efek hover untuk membesar dan lebih terang
            whileHover={{ scale: 1.15, filter: 'brightness(1.2)' }}
            // Styling Container Ikon (Oval/Blob Gelap dengan Border dan Glow)
            className={`absolute ${position} flex items-center justify-center p-1.5 sm:p-2 md:p-3 rounded-xl bg-gradient-to-br from-[#151F33] to-[#0F1626] border border-[#1F2F4D]
                         w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 shadow-[0_0_20px_-5px_rgba(30,132,138,0.5)] cursor-pointer z-20`}
          >
            {/* Cahaya Berdenyut pada Container Ikon */}
            <motion.div
              variants={floatingPulseGlowVariants}
              animate="pulse"
              className="absolute inset-0 rounded-xl"
            />
            {/* Ikon Teknologi Itu Sendiri */}
            <Icon className={`text-base sm:text-xl md:text-2xl lg:text-3xl ${color} relative z-30`} />
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default CoolProfileCard;