import { TypeAnimation } from "react-type-animation";

export const Hero = () => {
  const baiViet = [
    {
      title: "Bài viết 1",
      user: "Cá",
      role: "Coder",
      content: "Tôi sinh năm 5298. Vào thời đại này, con người gần như đạt tới sự bất tử. Các con robot giờ đây chung sống hòa thuận với mọi người. Vì nhà quá nghèo, không có một con robot nào nên tôi đã nhen nhóm trong mình một hoài bão, ước mơ. Đó chính là trả thành một developer. Tôi mong ước rằng tôi sẽ có thể tạo ra một con robot cho riêng mình.",
    },
    {
      title: "Bài viết 2",
      user: "Quẹ",
      role: "Thiểu Năng",
      content: "ádfghjkl4",
    },
    {
      title: "Bài viết 3",
      user: "Kito",
      role: "UI/UX",
      content: "wdssssssfgrewdfgtrefgbgt54rghy65t",
    },
  ];

  return (
    <div className="my-20">
      <div className="text-center">
        <h1 className="mx-auto  my-6 font-default text-5xl font-extrabold text-slate-50">
          <TypeAnimation
            sequence={[
              "Hello!",
              1000,
              "Welcome to our website.",
              1000,
              "This website is made by Kry, Pierrot and KitoMC.",
              1000,
            ]}
            wrapper="span"
            speed={35}
            repeat={Infinity}
          />
        </h1>
      </div>
      <div className="mt-20">
        <div className="text-center">
          <h1 className="mb-3 text-4xl font-extrabold text-slate-50">Blog</h1>
          <p className="text-lg font-normal text-slate-300">Chia sẻ</p>
        </div>
        <div className="mt-6">
          {baiViet.map(({ title, user, content, role }) => (
            <div key={user}>
              {title}
              {content}
              {role}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
