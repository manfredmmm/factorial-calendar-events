import type { NextPage } from 'next'
import Layout from 'components/layout'
import BigCalendar from 'components/calendar'

const Home: NextPage = () => {
  return (
    <Layout>
      <BigCalendar></BigCalendar>
    </Layout>
  );
};

export default Home;