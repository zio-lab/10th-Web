const HomePage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-blue-600">Home Page</h2>
      <p className="text-gray-700 leading-7">
        여기는 SPA의 홈 화면입니다.
      </p>
      <p className="text-gray-700 leading-7">
        React Router 없이 History API와 pathname을 이용해 라우팅을 구현했습니다.
      </p>
    </section>
  );
};

export default HomePage;