import type { NextPage } from 'next'
import Layout from 'components/layout'
import BigCalendar from 'components/calendar'
import { ModalContext, modalValues } from 'components/context/ModalContext'

const Home: NextPage = () => {
  return (
    <Layout>
      <ModalContext.Provider value={modalValues}>
        <BigCalendar></BigCalendar>
      </ModalContext.Provider>
    </Layout>
  );
};

export default Home;