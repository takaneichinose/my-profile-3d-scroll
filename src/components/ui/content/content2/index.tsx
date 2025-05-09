import { Portrait } from '@/components/ui/image/portrait';
import { experience } from '@/constants/experience';

export function Content2() {
  return (
    <div className="bg-white/20 p-8">
      <div className="w-full md:w-96 space-y-6">
        <div className="flex justify-center md:justify-start">
          <Portrait />
        </div>
        <h2 className="text-neutral-300 text-2xl flex justify-center md:justify-start">
          About me
        </h2>
        <div className="bg-sky-500/30 p-8 space-y-3 rounded-2xl shadow-lg backdrop-blur-md">
          <p className="text-cyan-200/70">
            I'm a full-stack web developer more specialized in front-end.
          </p>
          <p className="text-cyan-200/70">
            My hobby is to play computer games, and also music like playing
            piano.
          </p>
          <p className="text-cyan-200/70">
            I also love creating games during my free time
          </p>
        </div>
        <h2 className="text-neutral-300 text-2xl flex justify-center md:justify-start">
          My skills
        </h2>
        <div className="bg-sky-500/30 p-8 space-y-3 rounded-2xl shadow-lg backdrop-blur-md">
          {experience.map((item, index) => {
            const year = new Date().getFullYear() - item.startYear;

            return (
              <div key={index} className="flex justify-between">
                <span className="text-cyan-200/70">{item.name}</span>
                <span className="text-cyan-200/70">
                  {year} year{year > 1 && 's'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
