import bosco from "../../../../public/bosco.jpeg"

export const Register = () => {

    return (
    <div className="flex items-center justify-center w-full h-[100vh] bg-slate-200">

        <div className="w-96 h-[670px] flex items-center justify-center">
            <img src={bosco} alt="bosco" className="h-[670px] rounded-tl-[10px] rounded-bl-[10px]"/>
        </div>

        <div className="flex flex-col items-center justify-center bg-naranjaForm w-[400px] h-[670px] rounded-tr-[10px] rounded-br-[10px]">
            <div className="py-3 flex flex-col items-center justify-center">
                <h2 className="text-black text-2xl font-custom font-extrabold">Crea tu cuenta</h2>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAcFJREFUSEvV1UuoT1EUBvDfHXiFDExNJEVEDLwiQ24yFMoAI0OUMpABSQqZGl0Tr+7g3iRGSmFgpAghJSZIEQnldZbOrd129v+/u3WLXadTZ317fWt9e+3vDJjgNTDB+f0TBMuxASuxhj9FPcZTXMVoLxV6dTAZJ7C3j4y3sQWvu3AlgoUYbp5FlWcUhRysJZiK+5jfseEJvmMeAhfrInbgZy3BaexLwN9wDGfxtv0+qUl4GNHpVvwodZpLtB43E/AnLMPzSqn+guUEF7A9Qe3G0HiTx76c4C5WtAk/YlaWfFozrtf7EB7FjTFMTvAOs9tgjN+6LNkMhGy91gGcLBG8wpw2eAdrx0EQA3KmRHAFm9vgF0zHr4SkS6LoeHGC2dZM1+USQeh3KAHvwrk+kpzC/gQzFy9KBBF8lFyiD1iKlwWSJYizmtnGH2bddLppXPnjScL3TUU7EfKNrfCpPTiSTVqM+KW0mC4vilt6r8OHguhZMyExSWEVU7KurmFT3mnJ7BY00ow01cS7Zt3CID7XEgQuZAip0gPM939FeFf4Uqcf1fzRwos2YjVWtbf/QfuzOY83vVqsIaiRqIj5/wl+A2MwRxkhHnjuAAAAAElFTkSuQmCC"
                className="rounded-full p-3 cursor-pointer mx-3 border border-solid border-b-2 border-t-0 border-gray-500 shadow-md transition duration-300 ease-in-out hover:bg-gray-900 hover:text-white hover:border-transparent"
                />
    
                <p className="text-black mt-3 font-custom font-bold">O usa tu email para registrarte!</p>
            </div>

            <form className="mt-4 flex flex-col items-center justify-center">

                <label className="flex items-center mb-4 mx-[5%] rounded-[10px] px-5 shadow-md  bg-white">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAZxJREFUSEu11L1vjWEYx/HPSecmmgpCajHUaOofIF5K01EbU/8CidCkpoYNIQzduyojUukLo9UmBgtB21RIGQnPldxtTh7nPveTU+da7/v6fa/3lj5bq8/6mgImq0Bu4kQK6D3m8bwUYBPAHG5nhGZxvxukBDiPF9hAgFaS2DncwRGcwXoOUgKsJoFpPK6JTGEJy7jYK+AbDlRlGMTPmsgwtvEZx3oFbOIQDuJrBhB/olQdrVSiqPlZRDmeZEoUPbrQK6C9yTEx0ZOBBL2Lw/ttcgR2DSEWwu32u+pLQB/uZ0x3fUdxHTGev/Ayzf+7/7FoJY2u792aHOMZUY/hVJqmdrEtvMHrlM2PTqQcIKZiMTWxSQaxCzNYq3/uBJjAs/TxKW4hjtv3mnNkGMcv3sMnLAKLsd2zOmAIb1PkcWtuNAkf91I5v+BkNXk7u351wFU8wCucbige30InljIO35Vq8xdygDhol0rLkwGPp8P3CJdzgA8YQZSqXvNSQkfxCR9xPAf4kx5KNyoH+8e/V6FSNtkpauzY9GPfM/gL5dBHGcZ57nQAAAAASUVORK5CYII="/>
                    <input className="w-full p-2 rounded-2xl text-midnightblue border-none" placeholder="usuario"></input> 
                </label>

                <label className="flex items-center mb-4 mx-[5%] rounded-[10px] px-5 shadow-md  bg-white">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAUlJREFUSEvd1T8ohWEUx/GPJIPBZJBSMmCwW2xGpbBSNmVSBhbJRCmTsilWfxaZbBYzA5OQMpgMBsmfe/S8um73ute93eWe5an3vM/5nt/vvM/zNqlzNNW5vsYCjGEN/TXadoUFnESdfIse0FVj8Wz7DXoLAZ8pO4DrKkGhPhT81M5XkAFeMI3Df0LGsYu2coCs7gYW8V4G1JxmF77nx3fzxRTMYButOMMEnkpAOnCAYbxiFjvlFAR0EMfoxiNC/nkBZCjZ2Il7jOaauURmdUkFmap27GMEb5jHVoLMYRMtOMVkLv+cchUDMgtXsJw276V1Kq2RW83rOh7/C5C5EipCTaiKiG6j6+i+MKoCRJEeHOXUfKSZ3JYYfNWASo9FAwPu0ndfqRV/vRfziZn9OslxXa+jr0bCRe5ULxW7rmusW3x7Y/0y62LRF2qEQhkl8rgIAAAAAElFTkSuQmCC"/>
                    <input className="w-full p-2 rounded-2xl text-midnightblue border-none" placeholder="correo electrónico"></input>
                </label>

                <label className="flex items-center mb-4 mx-[5%] rounded-[10px] px-5 shadow-md  bg-white">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPtJREFUSEvt1TFKA0EYxfFfvEKwEEEIFqb1Cjams5HcQbASG7FRTKFYWMU7WNkFEvAKFjZ2oiBW4g2CGphAXHbzZVeCFplqmG/m/Wceb2Zq5txqc9Y3K2AXe9hKG7pDF7fRBmcBXOKwQOgEp9MgEaCNmyRwhuvU38dx6m9jUASJAPfYxAGuMiIjQAd9tKoChlj69nsZ7xmRFbzhA/WqgM+0sOikUT1MUSQQ1f8GsINzNKOMZ+qPKc69yfE8b1+xWlJ8PP0J6xEg9LUAnrsu7wQLwA9XFhZNBur/pOgFaxUv2jMa0UUbPRUX2CgJecARwqeipO706dGP9mvYFyImMRnCUhKsAAAAAElFTkSuQmCC"/>
                    <input className="w-full p-2 rounded-2xl text-midnightblue border-none" placeholder="contraseña"></input>
                </label>

                <label className="flex items-center mb-4 mx-[5%] rounded-[10px] px-5 shadow-md  bg-white">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAPtJREFUSEvt1TFKA0EYxfFfvEKwEEEIFqb1Cjams5HcQbASG7FRTKFYWMU7WNkFEvAKFjZ2oiBW4g2CGphAXHbzZVeCFplqmG/m/Wceb2Zq5txqc9Y3K2AXe9hKG7pDF7fRBmcBXOKwQOgEp9MgEaCNmyRwhuvU38dx6m9jUASJAPfYxAGuMiIjQAd9tKoChlj69nsZ7xmRFbzhA/WqgM+0sOikUT1MUSQQ1f8GsINzNKOMZ+qPKc69yfE8b1+xWlJ8PP0J6xEg9LUAnrsu7wQLwA9XFhZNBur/pOgFaxUv2jMa0UUbPRUX2CgJecARwqeipO706dGP9mvYFyImMRnCUhKsAAAAAElFTkSuQmCC"/>
                    <input className="w-full p-2 rounded-2xl text-midnightblue border-none" placeholder="repetir contraseña"></input>
                </label>

                <label className="flex items-center mb-4 mx-[5%] rounded-[10px] px-5 shadow-md  bg-white">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAStJREFUSEvt1bEuBFEUBuBvCxqFghfQSRQaPV5A7yEIQUEUErolROMVvAUajUolGm+gUKgkmLu5I9fsHbOb7G4UO9XMmf/+/znn3vufliE/rSHzG6nAE2ZxjCt81FQ3gQ3s00nwHBd4z+HTCr4SwAsOcY0yHrDrOMFchewVZ7isCuUE7rAcCR6xg0m0sRDjKSZ9f4u4n4pyAiG2UhAdJUJlwoEsxG8rlVXxz0X182FRnUBJGBbexI/VSFz+S1uXw3e4mwQCJkfUc3wsUG1zV+vGLfqfLer3Qv2JTzf5AUuJ1/RiCU0W8usmT2GrcMO9woKnG0wtmOBuxJxiMYPvsooymyC0GV10pmLL/dh4rUAqFCraxmecA70MogPcYy13xAY+okc6kweefSD8Bs7DYhnkyIRIAAAAAElFTkSuQmCC"/>
                    <select className="border-none w-full rounded-3xl outline-none flex items-center p-2">
                    <option value="" disabled selected>Provincia</option>
                    </select>
                </label> 

                <label className="flex items-center mb-4 mx-[5%] rounded-[10px] px-5 shadow-md  bg-white">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlxJREFUSEu11cmrj1EYB/DPNacMkTlEhDIryZRhIUNio4iSIRIbFuIPYIMSJSFFkmkhkY0pQ4kimYWMmZUkM+epc3Vd9zeEe3bv2znP93yH5zkVanlV1HJ95QB0wnRMQL98oUs4gt14XOySxQCaYicmFynwA3sxBx9q2lcIoDHOozc+YTPW414u0hVLMR8N8t4R+FIdpBDADszCI4zDjQIs+uJoukA7rMOycgD64Aq+Jp0HI/Rui62p2JBc4GzSfh5eYiRO4TO64GlVkJoYbMBibMSSXLwSpOrZYNcfb7ALMxLISqwuBXAH3bL+17LRM3Ew+bEiH16bdB+fvVmYGIxOTI7jdGb0C6MmBmFqGFcX35ORT9AebfCiisl3U3oeojNaJLavM5uWpRi8RXM0wfuc8w7oWCXz0RsP8nf8j73vEGcDrCiDixiUmqhH0vV2uuF2zM4SLUejxHBVbrxt2exeuI4LORhFAbbkQ2FwGN0KV9G6WgSjg8PkkCbiuSbJuCnJuKgUgzE4hsvp1gPy5vCgMqbhyxkswHPUwc2UpO4YhnOlAML4+9m8KVmaYuMmEhYj5RZ6ltNosWca9uAZovFeFUAI80O+CMUkHC4XIPadwKjcpWPxrdrhhlmOgSkUhwoNxWLTNMZDNFrELtISgy2mZ6x62Jd8CgmjF8LsiOgfq9R7MDSxOIn6iAE4N8c03oGQJEZ0GBuBqHGVAohDU9PY2J/TEo9MvBPD8xifmBNXMATlAMTh8OAAmuVKYX48RNFYRVe5AFEkujWS9TFr/9tY/heJSl3yvzH4K6CfFgx2GUKNzOIAAAAASUVORK5CYII="/>
                    <select className="border-none w-full rounded-3xl outline-none flex items-center p-2">
                    <option value="" disabled selected>Localidad</option>
                    </select>
                </label>

                <label className="flex items-center h-auto">
                    <input className="w-[5%]" type="checkbox" />
                    <p className="text-sm">Acepto los Términos y condiciones y autorizo el uso de mis datos de acuerdo a la Declaración de Privacidad.</p>
                </label>

                <label className="flex items-center h-12">
                    <input className="w-[5%]" type="checkbox"  />
                    <p className="text-sm">Quiero recibir notificaciones</p>
                </label>

                <button className="font-bold font-custom bg-black outline-none  rounded-2xl m-2 px-5 py-3 text-white cursor-pointer transition duration-300 ease-in-out hover:bg-transparent hover:text-black hover:shadow-md"
                >Registrarme </button>

            </form>
        </div>
    </div>
    )
}