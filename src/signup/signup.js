import React, { Suspense, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignupContext from './signupContext';

const Email = React.lazy(() => import('./email'));
const Mobile = React.lazy(() => import('./mobile'));
const Confirm = React.lazy(() => import('./confirm'));
const FullName = React.lazy(() => import('./fullName'));
const Consent = React.lazy(() => import('./consent'));
const DateOfBirth = React.lazy(() => import('./dateOfBirth'));
const Address = React.lazy(() => import('./address'));
const EmailOtp = React.lazy(() => import('./emailOtp'));
const MobileOtp = React.lazy(() => import('./mobileOtp'));
const UserType = React.lazy(() => import('./userType'));
const Gender = React.lazy(() => import('./gender'));
const GuardianFullName = React.lazy(() => import('./guardianDetails/guardianFullName'));
const GuardianEmail = React.lazy(() => import('./guardianDetails/guardianEmail'));
const GuardianEmailOtp = React.lazy(() => import('./guardianDetails/guardianEmailOtp'));
const GuardianMobile = React.lazy(() => import('./guardianDetails/guardianMobile'));
const GuardianMobileOtp = React.lazy(() => import('./guardianDetails/guardianMobileOtp'));
const Relationship = React.lazy(() => import('./guardianDetails/guardianRelationship'));

/**
* Component for signup flow
*/
function Signup() {
    const { pageState, updatePageState, formData } = useContext(SignupContext);
    const navigate = useNavigate();
    const handleHome = () => {
        navigate('/');
    };
    const [validator, setValidator] = useState(() => () => true);

    /**
    * Renders previous screen based on current screen
    */
    const handleBack = () => {
        try {
            switch (pageState.screen) {
                case 'confirm':
                    updatePageState({ screen: formData.userType === 'student' ? 'guardianMobile' : 'address' });
                    break;
                case 'guardianMobileOtp':
                    updatePageState({ screen: 'guardianMobile' });
                    break;
                case 'guardianMobile':
                    updatePageState({ screen: 'guardianEmail' });
                    break;
                case 'guardianEmailOtp':
                    updatePageState({ screen: 'guardianEmail' });
                    break;
                case 'guardianEmail':
                    updatePageState({ screen: 'guardianRelationship' });
                    break;
                case 'guardianRelationship':
                    updatePageState({ screen: 'guardianFullName' });
                    break;
                case 'guardianFullName':
                    updatePageState({ screen: 'address' });
                    break;
                case 'address':
                    updatePageState({ screen: 'dob' });
                    break;
                case 'dob':
                    updatePageState({ screen: 'mobile' });
                    break;
                case 'mobileOtp':
                    updatePageState({ screen: 'mobile' });
                    break;
                case 'mobile':
                    updatePageState({ screen: 'email' });
                    break;
                case 'emailOtp':
                    updatePageState({ screen: 'email' });
                    break;
                case 'email':
                    updatePageState({ screen: 'fullName' });
                    break;
                case 'fullName':
                    updatePageState({ screen: 'gender' });
                    break;
                case 'gender':
                    updatePageState({ screen: 'userType' });
                    break;
                case 'userType':
                    updatePageState({ screen: 'consent' });
                    break;
                default:
                    updatePageState({ screen: 'consent' });
            }
            updatePageState({ pageNum: pageState.pageNum - 1 });
        } catch (error) {
            console.error(error)
        }
    };

    /**
    * Runs the validation function of each specific screen on clicking next
    */
    const handleNext = () => {
        try {
            validator();
        } catch (error) {
            console.error(error)
        }
    }

    /**
    * Renders the next page if respective input is valid 
    */
    useEffect(() => {
        try {
            if (pageState.proceed === true) {
                switch (pageState.screen) {
                    case 'consent':
                        updatePageState({ screen: 'userType' });
                        break;
                    case 'userType':
                        updatePageState({ screen: 'gender' });
                        break;
                    case 'gender':
                        updatePageState({ screen: 'fullName' });
                        break;
                    case 'fullName':
                        updatePageState({ screen: 'email' });
                        break;
                    case 'email':
                        updatePageState({ screen: 'emailOtp' });
                        break;
                    case 'emailOtp':
                        updatePageState({ screen: 'mobile' });
                        break;
                    case 'mobile':
                        updatePageState({ screen: 'mobileOtp' });
                        break;
                    case 'mobileOtp':
                        updatePageState({ screen: 'dob' });
                        break;
                    case 'dob':
                        updatePageState({ screen: 'address' });
                        break;
                    case 'address':
                        updatePageState({ screen: formData.userType === 'student' ? 'guardianFullName' : 'confirm' });
                        break;
                    case 'guardianFullName':
                        updatePageState({ screen: 'guardianRelationship' });
                        break;
                    case 'guardianRelationship':
                        updatePageState({ screen: 'guardianEmail' });
                        break;
                    case 'guardianEmail':
                        updatePageState({ screen: 'guardianEmailOtp' });
                        break;
                    case 'guardianEmailOtp':
                        updatePageState({ screen: 'guardianMobile' });
                        break;
                    case 'guardianMobile':
                        updatePageState({ screen: 'guardianMobileOtp' });
                        break;
                    case 'guardianMobileOtp':
                        updatePageState({ screen: 'confirm' });
                        break;
                    default:
                        updatePageState({ screen: 'consent' });
                }
                updatePageState({ pageNum: pageState.pageNum + 1, proceed: false });
            }
        } catch (error) {
            console.error(error)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageState.pageNum, pageState.proceed, pageState.screen]);

    return (
        <div>
            <h1>Signup</h1>
            <button onClick={handleHome}>Home</button>
            <p>Page number: {pageState.pageNum}</p>
            <progress id="pageNumber" value={pageState.pageNum - 1} max={formData.userType === 'student' ? 16 : 10}>{pageState.pageNum}</progress>

            {/* Signup flow screens */}
            <Suspense fallback={<p>Loading</p>}>

                {pageState.screen === 'consent' && <Consent setValidator={setValidator} />}
                {pageState.screen === 'userType' && <UserType setValidator={setValidator} />}
                {pageState.screen === 'gender' && <Gender setValidator={setValidator} />}
                {pageState.screen === 'fullName' && <FullName setValidator={setValidator} />}
                {pageState.screen === 'email' && <Email setValidator={setValidator} />}
                {pageState.screen === 'emailOtp' && <EmailOtp setValidator={setValidator} />}
                {pageState.screen === 'mobile' && <Mobile setValidator={setValidator} />}
                {pageState.screen === 'mobileOtp' && <MobileOtp setValidator={setValidator} />}
                {pageState.screen === 'dob' && <DateOfBirth setValidator={setValidator} />}
                {pageState.screen === 'address' && <Address setValidator={setValidator} />}

                {/* Guardian details screens, if user is a student */}

                {formData.userType === 'student' && (
                    <>
                        {pageState.screen === 'guardianFullName' && <GuardianFullName setValidator={setValidator} />}
                        {pageState.screen === 'guardianRelationship' && <Relationship setValidator={setValidator} />}
                        {pageState.screen === 'guardianEmail' && <GuardianEmail setValidator={setValidator} />}
                        {pageState.screen === 'guardianEmailOtp' && <GuardianEmailOtp setValidator={setValidator} />}
                        {pageState.screen === 'guardianMobile' && <GuardianMobile setValidator={setValidator} />}
                        {pageState.screen === 'guardianMobileOtp' && <GuardianMobileOtp setValidator={setValidator} />}
                    </>
                )}

                {/* Confirm and edit details*/}

                {pageState.screen === 'confirm' && <Confirm setValidator={setValidator} />}

                {/* Navigation buttons */}

                {pageState.screen !== 'consent' && <button onClick={handleBack}>Back</button>}
                <button onClick={handleNext}>Next</button>

            </Suspense>
        </div>

    );
}

export default Signup;