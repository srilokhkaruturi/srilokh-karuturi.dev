import type { NextPage } from 'next'


function anything() {
    return (

        <>

            <div> This is not a page. Please go back to the home.  </div>
            <button onClick={() => {
                location.assign("/")
            }}> Go back to home </button>



        </>



    )
}


export default anything;