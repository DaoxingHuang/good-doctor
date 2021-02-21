import Error from 'next/error';

export default function Page404() {
  return <Error statusCode={404} title="This article could not be found" />;
}
