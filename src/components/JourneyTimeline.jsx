import React from 'react';

const timelineData = [
  {
    date: "Jul 2019 - May 2022",
    category: "Education",
    title: "SMK Negeri 8 Malang",
    subtitle: "Vocational High School - Software Engineering",
    description: "Membangun fondasi kuat dalam rekayasa perangkat lunak dan pemrograman berorientasi objek (C++ dan Java). Mengembangkan aplikasi web interaktif menggunakan HTML, CSS, PHP, serta merancang dan mengelola relational databases.",
  },
  {
    date: "Jan 2021 - May 2021",
    category: "Work Experience",
    title: "Web Developer Intern",
    subtitle: "Ezy Industries - Malang, Indonesia",
    description: "Mengembangkan dan memelihara halaman web dinamis menggunakan HTML dan PHP. Membantu desain UI yang responsif, melakukan troubleshoot basis kode, serta secara proaktif mempelajari framework modern seperti Laravel untuk backend dan Vue.js untuk frontend.",
  },
  {
    date: "Aug 2023 - Present",
    category: "Education",
    title: "UIN Maulana Malik Ibrahim Malang",
    subtitle: "Bachelor of Informatics Engineering",
    description: "Saat ini berada di semester 6, berfokus pada pengembangan perangkat lunak full-stack dan Artificial Intelligence (Python). Membangun antarmuka responsif dan API yang aman (Laravel, Node.js, TailwindCSS), serta mengembangkan aplikasi cross-platform (Flutter) dan game interaktif (Unity).",
  }
];

const JourneyTimeline = () => {
  return (
    <section className="py-20 relative px-6 md:px-0" id="journey">

      {/* Judul Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
          <span className="text-[#86a8c3] font-bold text-sm uppercase tracking-widest">EXPERIENCE</span>
          <div className="h-[2px] w-8 bg-[#86a8c3]"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">My Journey</h2>
      </div>

      {/* Wadah Timeline Utama */}
      <div className="relative max-w-5xl mx-auto">

        {/* Garis Vertikal Tengah (Background) */}
        <div className="absolute left-[22px] md:left-1/2 w-0 md:w-[2px] transform md:-translate-x-1/2 top-0 bottom-0 flex justify-center z-0">
          <div className="w-[2px] bg-[#1e293b] h-full rounded-full"></div>
        </div>

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <div
              key={index}
              className={`scroll-reveal-target relative w-full mb-12 flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} justify-start`}
            >

              {/* Pembungkus Titik agar posisinya absolut aman di tengah */}
              <div className="absolute left-[22px] md:left-1/2 w-10 transform md:-translate-x-1/2 top-1/2 -translate-y-1/2 flex justify-center z-10">
                <div className="w-4 h-4 rounded-full bg-[#3b82f6] ring-4 ring-[#02050A] shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
              </div>

              {/* Wadah Kartu (Dibatasi 45% agar tidak menabrak titik) */}
              <div className={`w-full md:w-[45%] pl-14 md:pl-0 ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}>

                {/* Konten Kartu */}
                <div className={`p-4 sm:p-6 md:p-7 rounded-2xl bg-gradient-to-br from-[#0d131f] to-[#0a0f18] border border-[#1e293b] hover:border-[#3b82f6]/50 transition-colors duration-300 shadow-xl ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>

                  {/* Header Kartu: Label dan Tanggal */}
                  <div className={`flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3 ${isLeft ? 'md:flex-row-reverse' : ''}`}>
                    <span className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      item.category === 'Work Experience'
                        ? 'bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/20'
                        : 'bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20'
                    }`}>
                      {item.category}
                    </span>
                    <span className="text-[#8b949e] font-medium text-xs md:text-sm">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <h4 className="text-[#86a8c3] font-medium text-sm md:text-base mb-5">
                    {item.subtitle}
                  </h4>
                  <p className="text-[#8b949e] leading-relaxed text-sm">
                    {item.description}
                  </p>

                </div>

              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JourneyTimeline;