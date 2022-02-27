// import Grid from '@mui/material/Grid';
// import { ReactComponent as Logo } from '../../../assets/logo.svg';
// import { Button, Typography } from '@mui/material';
// import React from 'react';
// import { Formik, Field, Form } from 'formik';
// import { ReactComponent as IraImage } from '../../../assets/iraType.svg';
// import { GlobalStyles } from '@mui/styled-engine';

// const AccountType = () => {
//   return (
//     <Grid
//       container
//       sx={{
//         height: { xs: '130vh', sm: '100vh' },

//         width: '100vw',
//         overflow: 'hidden',
//         p: { xs: '3rem', md: '0' },
//       }}
//       className="accountTypeContainer"
//       justifyContent="center"
//       xs={12}
//     >
//       <GlobalStyles
//         styles={(theme) => ({
//           '.not-checked': {
//             boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
//           },

//           '.checked': {
//             boxShadow: '-1px 0px 25px -5px rgba(69, 153, 116, 1);',
//           },
//         })}
//       />
//       <Logo
//         style={{
//           position: 'absolute',
//           top: '0',
//           left: '0',
//           marginTop: '3rem',
//           marginLeft: '4rem',
//         }}
//         xs={12}
//       />

//       <Grid container xs={12} gap="2rem">
//         <Grid item xs={12} alignSelf="end">
//           <Typography variant="h2">Choose Your Type of Account</Typography>
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant="h3" color="#9FA6AB" sx={{ fontWeight: '300' }}>
//             You can choose both
//           </Typography>
//         </Grid>
//       </Grid>

//       <Grid container gap="2" xs={12} justifyContent="center" direction="row">
//         <Formik
//           initialValues={{
//             accountType: [],
//           }}
//           onSubmit={async (values) => {
//             console.log(values);
//           }}
//         >
//           {({ values }) => (
//             <Form
//               className="accountTypeDirection"
//               style={{
//                 display: 'flex',
//                 gap: '2rem',

//                 // direction: { xs: "column", md: "row" },
//               }}
//             >
//               <label>
//                 <Grid
//                   item
//                   xs={12}
//                   direction="column"
//                   alignItems="center"
//                   className={
//                     values.checked.includes('Roth IRA')
//                       ? 'checked'
//                       : 'not-checked'
//                   }
//                   sx={{
//                     borderRadius: 5,
//                     paddingTop: '3.5rem',
//                     paddingBottom: '5rem',
//                     px: '3.5rem',
//                   }}
//                 >
//                   <Field
//                     type="checkbox"
//                     name="accountType"
//                     value="Roth IRA"
//                     style={{ visibility: 'hidden' }}
//                   />
//                   Roth IRA
//                   <Typography
//                     xs={12}
//                     sx={{ paddingBottom: '1rem' }}
//                     variant="h2"
//                   >
//                     Roth Ira
//                   </Typography>
//                   <Typography
//                     xs={12}
//                     variant="body1"
//                     sx={{ paddingBottom: '3.5rem' }}
//                   >
//                     Loremi sdas
//                   </Typography>
//                   <IraImage />
//                 </Grid>
//               </label>

//               <label>
//                 <Grid
//                   item
//                   xs={12}
//                   direction="column"
//                   alignItems="center"
//                   className={
//                     values.checked.includes('Traditional IRA')
//                       ? 'checked'
//                       : 'not-checked'
//                   }
//                   sx={{
//                     borderRadius: 5,
//                     paddingTop: '3.5rem',
//                     paddingBottom: '5rem',
//                     px: '3.5rem',
//                   }}
//                 >
//                   <Field
//                     type="checkbox"
//                     name="accountType"
//                     value="Traditional IRA"
//                     style={{ visibility: 'hidden' }}
//                   />
//                   Traditional IRA
//                   <Typography
//                     xs={12}
//                     sx={{ paddingBottom: '1rem' }}
//                     variant="h2"
//                   >
//                     Roth Ira
//                   </Typography>
//                   <Typography
//                     xs={12}
//                     variant="body1"
//                     sx={{ paddingBottom: '3.5rem' }}
//                   >
//                     Loremi sdas
//                   </Typography>
//                   <IraImage />
//                 </Grid>
//               </label>

//               <Button
//                 type="submit"
//                 variant="contained"
//                 href="/bank-account"
//                 sx={{
//                   position: { xs: 'relative', sm: 'absolute' },
//                   bottom: '0',
//                   right: '0',
//                   marginBottom: '8rem',
//                   marginRight: { xs: '0', sm: '12rem' },
//                 }}
//               >
//                 Continue
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Grid>
//     </Grid>
//   );
// };

// export default AccountType;
