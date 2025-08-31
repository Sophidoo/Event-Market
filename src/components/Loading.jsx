import logo from "../assets/images/logo2.png"

const Loading = ({h, min}) => {

    return <>
        <section className={`w-full h-full min-h-[${min}] flex items-center justify-center animate-pulse`}>
            <img src={logo} alt="" className="animate-pulse object-cover h-auto w-100"/>
        </section>
    </>
}

export default Loading