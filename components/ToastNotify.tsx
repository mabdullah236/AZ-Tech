import { CheckIcon } from "./Icons"

const ToastNotify=(props)=>{
    return (
        <>
        <div 
                className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 z-[60] ${props.notification ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckIcon className="w-3 h-3 text-white" />
                </div>
                <span className="font-medium text-sm">{props.notification}</span>
              </div>
        </>
    )
}
export default ToastNotify;