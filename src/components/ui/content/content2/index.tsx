import { Portrait } from '@/components/ui/image/portrait';
import { experience } from '@/constants/experience';
import React from 'react';

export function Content2() {
  return (
    <React.Fragment>
      <div className="bg-white/20 h-dvh py-8">
        <div className="w-full md:w-xl h-full flex flex-col justify-between">
          <h2 className="text-neutral-300 text-center md:text-left text-4xl px-8">
            About me
          </h2>
          <div className="bg-black/50 p-8 space-y-3 shadow-lg backdrop-blur-md">
            <div className="flex justify-center md:justify-start">
              <Portrait />
            </div>
            <p className="text-white">
              I'm a full-stack web developer more specialized in front-end.
            </p>
            <p className="text-white">
              My hobby is to play computer games, and also music like playing
              piano.
            </p>
            <p className="text-white">
              I also love creating games during my free time
            </p>
          </div>
        </div>
      </div>
      <div className="bg-black/20 h-dvh py-8 flex justify-end">
        <div className="w-full md:w-xl h-full flex flex-col justify-between">
          <h2 className="text-neutral-300 text-center md:text-right text-4xl px-8">
            My skills
          </h2>
          <div className="bg-white/15 p-8 space-y-3 shadow-lg backdrop-blur-md">
            {experience.map((item, index) => {
              const year = new Date().getFullYear() - item.startYear;

              return (
                <div key={index} className="flex justify-between">
                  <span className="text-white">{item.name}</span>
                  <span className="text-white">
                    {year} year{year > 1 && 's'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
