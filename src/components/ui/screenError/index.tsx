type props = {
  message: string;
};

export function ScreenError({ message }: props) {
  return <div>Error: {message}</div>;
}
