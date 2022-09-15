import type { NextPage } from 'next'

const Resume: NextPage = () => {

  return (
    <iframe src='/resume.pdf' style={{ width: "98vw", height: "100vh" }} />
  )
}

export default Resume;
