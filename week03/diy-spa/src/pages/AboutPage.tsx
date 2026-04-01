const AboutPage = () => {
  return (
    <section className="space-y-4">
      <h2 className="text-3xl font-bold text-green-600">About Page</h2>
      <p className="text-gray-700 leading-7">
        이 페이지는 프로젝트 소개를 위한 화면입니다.
      </p>
      <p className="text-gray-700 leading-7">
        브라우저의 현재 주소를 읽고 조건에 따라 다른 페이지를 렌더링합니다.
      </p>
    </section>
  );
};

export default AboutPage;