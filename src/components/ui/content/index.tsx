import { Content1 } from './content1';
import { Content2 } from './content2';
import { Content3 } from './content3';

export function Content() {
  return (
    <div className="w-full relative">
      <Content1 />
      <div className="h-dvh">{/* SPACER */}</div>
      <Content2 />
      <div className="h-dvh">{/* SPACER */}</div>
      <div className="h-dvh">{/* SPACER */}</div>
      <div className="h-dvh">{/* SPACER */}</div>
      <Content3 />
    </div>
  );
}
