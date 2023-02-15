

  const POLICY = 'h-screen w-screen overflow-y-auto md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2 h-screen p-4 py-8'
  const TITLE = 'text-4xl font-black'
  const SUBTITLE = 'text-2xl font-bold'
  const SUBSUBTITLE = 'text-md'
  const TEXT = 'text-sm font-thin'

const PrivacyPolicy = () => {
 
  const EFFECTIVE_DATE = '02/14/2023'
  const CONTACT_EMAIL = 'tylerjameslundin@gmail.com'

  return (
    <div className={POLICY}>
      <h1 className={TITLE}> Privacy Policy for Zen Log </h1>
      <h3 className={SUBSUBTITLE} > Effective date: { EFFECTIVE_DATE } </h3>
      <p className={TEXT} > At Zen Log, we are committed to protecting your privacy. This Privacy Policy describes the types of information we collect from you when you use our app, how we use that information, and your options for managing your information. </p>

        <br />
      <h2 className={SUBTITLE} > Information We Collect </h2>
      <h3 className={SUBSUBTITLE} >  When you use Zen Log, we may collect the following types of information: </h3>
      <ul>
        <li className={TEXT} > Personal Information: This includes your name, email address, and any other information you provide when you create an account or use certain features of the app. </li>
        <li className={TEXT} > Usage Information: This includes information about how you use the app, such as the features you use and the time you spend in the app. </li>
        <li className={TEXT} > Device Information: This includes information about the device you use to access the app, such as the type of device, operating system, and mobile network information. </li>
      </ul>

        <br />
      <h2 className={SUBTITLE} > How We Use Your Information </h2>
      <h3 className={SUBSUBTITLE} > We use the information we collect to: </h3>
      <ul>
        <li className={TEXT} > Provide and improve the app and its features </li>
        <li className={TEXT} > Personalize your experience with the app </li>
        <li className={TEXT} > Communicate with you about the app and its features </li>
        <li className={TEXT} > Analyze how users use the app and improve our services </li>
        <li className={TEXT} > Enforce our Terms of Service </li>
      </ul>

        <br />
      <h2 className={SUBTITLE} > How We Share Your Information </h2>
      <ul>
        <li className={TEXT} > We do not sell or share your personal information with third parties for their marketing purposes. However, we may share your information in the following circumstances: </li>
        <li className={TEXT} > With service providers who help us operate the app and provide its features </li>
        <li className={TEXT} > With law enforcement or government agencies when required by law or to protect our legal rights </li>
        <li className={TEXT} > With your consent </li>
      </ul>

        <br />
      <h2 className={SUBTITLE} > Your Options for Managing Your Information </h2>
      <p className={TEXT} > You can manage your information by accessing your account settings in the app. You can also contact us at any time to request that we delete your account and any personal information associated with it. </p>
      
        
        <br />
      <h2 className={SUBTITLE} >Changes to This Privacy Policy</h2>
      <p className={TEXT} > We may update this Privacy Policy from time to time. If we make any material changes, we will notify you by email or by posting a notice in the app. </p>

        <br />
      <h2 className={SUBTITLE} > Contact Us </h2>
      <p className={TEXT} > If you have any questions about this Privacy Policy or how we handle your information, please contact us at {CONTACT_EMAIL}. </p>
    </div>
  )
}

export default PrivacyPolicy;
