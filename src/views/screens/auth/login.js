import React from 'react';
import searchingSVG from '../../../assets/search image.svg';
import LoginForm from '../../components/login_form';
const Login = ({ handleLog }) => {
    return (
        <div className="h-screen grid grid-cols-2">
            <div className="bg-blue-800 flex">
                <div className="m-auto text-center">
                    {/* <img className="m-auto" src={searchingSVG} /> */}
                    <h1 className="text-white font-bold text-4xl my-8">
                        INSUREPULSE
                    </h1>
                    <p className="text-[#8BA3F8]">
                        Powered by Kainovation Technologies
                    </p>
                </div>
            </div>
            <div
                className="place-items-center m-auto px-16"
                style={{ width: '40vw' }}>
                <h1 className="text-black-200 font-bold text-4xl mb-5">Hello!</h1>
                <p className="text-txt-blue-grey">
                    Welcome to INSUREPULSE, please Login to continue
                </p>
                <div>
                    <LoginForm handleLog={handleLog} />
                </div>
            </div>
        </div>
    );
};

export default Login;
