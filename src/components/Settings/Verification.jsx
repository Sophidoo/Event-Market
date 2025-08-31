import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { useCallback, useRef, useState } from "react";


const Verification = () => {
    const [showNextVerification, setShowNextVerification] = useState(false)
    const [frontFile, setFrontFile] = useState(null);
    const [backFile, setBackFile] = useState(null);
    const frontInputRef = useRef(null);
    const backInputRef = useRef(null);
    const webcamRef = useRef(null);
    const [img, setImg] = useState(null);

   
     const capture = useCallback((e) => {
        e.preventDefault()
        const imageSrc = webcamRef.current.getScreenshot();
        setImg(imageSrc);
    }, [webcamRef]);
    

    const handleDocumentFileChange = (e, side) => {
    const file = e.target.files[0];
    if (file) {
        side === 'front' ? setFrontFile(file) : setBackFile(file);
    }
    };

    const removeDocumentFile = (side) => {
        side === 'front' ? setFrontFile(null) : setBackFile(null);
        if (side === 'front' && frontInputRef.current) {
            frontInputRef.current.value = '';
        }
        if (side === 'back' && backInputRef.current) {
            backInputRef.current.value = '';
        }
    };

    const triggerDocumentFileInput = (side) => {
        side === 'front' ? frontInputRef.current.click() : backInputRef.current.click();
    };

    return <>
        <form>
            <div className="settingsSectionHeading mb-[-10px]">
                <h2>Kyc Verification</h2>
                <p className="text-gray-500">Fill in the input below to verify your account</p>
            </div>

            <hr className="border-[1px] border-gray-200 bg-gray-200"/>
            
            {
                showNextVerification ?
                <section>
                    <div className="inputWrapper">
                        <label htmlFor="">Selfie Verification</label>
                        <p>We will compare the photo in your document with your selfie to confirm your identity so use proper lighting and make sure your face is centered</p>
                    </div>

                    {!img ? (
                        <>
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={{
                            facingMode: 'user' // or 'environment' for rear camera
                            }}
                            className="w-full max-w-[300px] rounded-2xl"
                        />
                        <button onClick={capture} className="w-fit flex items-center gap-1 bg-[#0B544C] text-white px-4 py-2 text-[12px] rounded-sm cursor-pointer hover:bg-green-900"><FiCamera className="text-[15px] mb-0.5"/> Capture photo</button>
                        </>
                    ) : (
                        <>
                        <img src={img} alt="Captured" className="w-full max-w-[300px] rounded-2xl" />
                        <button onClick={(e) => {
                            e.preventDefault()
                            setImg(null)
                        }} className="w-fit flex items-center gap-1 bg-[#0B544C] text-white px-4 py-2 text-[12px] rounded-sm cursor-pointer hover:bg-green-900"><MdCameraswitch className="text-[15px] mb-0.5"/> Retake</button>
                            
                        </>
                    )}

                    
                </section>

                : 

                <section className="verificationSettings">
                    <div className="inputContainer">
                        <div className="inputWrapper">
                            <label htmlFor="" className="text-gray-700">Country</label>
                            <p>Select the country of registeration for the document</p>
                            <select name="" id="" className="border border-gray-300">
                                <option value=""></option>
                            </select>
                        </div>
                        <div className="inputWrapper">
                            <label htmlFor="" className="text-gray-700">Document Type</label>
                            <p>Select the document type</p>
                            <select name="" id="" className="border border-gray-300">
                                <option value=""></option>
                            </select>
                        </div>
                    </div>


                    <div className="inputContainer">
                        {/* Front Side Upload */}
                        <div className="inputWrapper">
                            <label className="font-medium text-gray-800 mb-1">Front side of your document</label>
                            <p className="text-xs text-gray-500">Upload the front side of your document</p>
                            <span className="text-xs text-gray-400 mb-1 mt-[-2px]">Supports: JPG, PNG, PDF</span>
                            
                            <div 
                            className={`border-2 ${frontFile ? 'border-green-500' : 'border-dashed border-gray-300'} rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
                            onClick={() => triggerDocumentFileInput('front')}
                            >
                            {frontFile ? (
                                <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <DocumentTextIcon className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">{frontFile.name}</span>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); removeDocumentFile('front'); }}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                <DocumentTextIcon className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="text-xs sm:text-sm text-gray-600">Choose a File</p>
                                </div>
                            )}
                            </div>
                            <input
                            type="file"
                            ref={frontInputRef}
                            onChange={(e) => handleDocumentFileChange(e, 'front')}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            />
                        </div>

                        {/* Back Side Upload */}
                        <div className="inputWrapper">
                            <label className="font-medium text-gray-800 mb-1">Back side of your document</label>
                            <p className="text-xs text-gray-500">Upload the back side of your document</p>
                            <span className="text-xs text-gray-400 mb-1 mt-[-2px]">Supports: JPG, PNG, PDF</span>
                            
                            <div 
                            className={`border-2 ${backFile ? 'border-green-500' : 'border-dashed border-gray-300'} rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors`}
                            onClick={() => triggerDocumentFileInput('back')}
                            >
                            {backFile ? (
                                <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <DocumentTextIcon className="h-5 w-5 text-green-500" />
                                    <span className="text-sm">{backFile.name}</span>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); removeDocumentFile('back'); }}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <XMarkIcon className="h-5 w-5" />
                                </button>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                <DocumentTextIcon className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="text-xs sm:text-sm text-gray-600">Choose a File</p>
                                </div>
                            )}
                            </div>
                            <input
                            type="file"
                            ref={backInputRef}
                            onChange={(e) => handleDocumentFileChange(e, 'back')}
                            className="hidden"
                            accept=".jpg,.jpeg,.png,.pdf"
                            />
                        </div>
                    </div>

                    <div className="settingsCheckboxInput">
                        <input type="checkbox" name="" id="" />
                        <label htmlFor="" className="text-gray-700">I confirm that i uploaded a valid-issued government-ID card</label>
                    </div>
                </section>
            }

            <hr className="border-[1px] border-gray-200 bg-gray-200"/>


            <div className="settingsButton">
            {
                showNextVerification ?
                <button className="bg-[#0B544C] text-white hover:bg-green-950">Submit</button>
                :
                <button className="bg-[#0B544C] text-white hover:bg-green-950" onClick={(e) => {
                    setShowNextVerification(true)
                    e.preventDefault()
                }}>Next</button>
            }
            </div>
            
        </form>
    </>

}

export default Verification