import React from 'react';
import Head from 'next/head';
import { TriviaButton } from '../components/button/triviaButton';

const Home = () => {
  return (
    <div className='container max-w-screen-md mx-auto text-sans'>
      <Head>
        <title>Trivia Button</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full text-center text-2xl font-bold pb-6'>
        Trivia Button
      </div>
      <div className='flex justify-center items-center content-center'>
        <TriviaButton size='small' volume='min' />
        <TriviaButton size='large' volume='low' />
        <TriviaButton size='big' volume='high' />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default Home;
