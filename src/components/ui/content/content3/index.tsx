import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { socials } from '@/constants/socials';

export function Content3() {
  return (
    <div className="bg-white min-h-dvh p-8">
      <div className="w-full md:w-96 space-y-6">
        <h2 className="text-neutral-500 text-2xl flex justify-center md:justify-start">
          My socials
        </h2>
        <div className="p-8 space-y-3 rounded-2xl shadow-lg backdrop-blur-">
          {socials.map((item, index) => (
            <div key={index} className="flex justify-start items-center">
              <a
                href={item.url}
                target="_blank"
                className="text-blue-500 underline"
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className="ml-2">{item.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="text-neutral-500 mt-6 flex justify-center">
        Made by TAKANEICHINOSE
      </div>
    </div>
  );
}
