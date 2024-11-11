// export const isUserLoggedIn = (req, res, next) => {
//   console.log("Authenticated:", req.isAuthenticated());
//   console.log("User:", req.user);
  
//   if (req.isAuthenticated()) {
//       return next();
//   }
//   req.flash('error', 'Please log in to view that resource');
//   res.redirect('/login');
// };

  
// export const isGuest = (req, res, next) => {
//   if (req.user && req.user.role === 'guest'){
//     req.flash('error', 'Guest users do not have permisison to perform this action.')
//     return res.redirect('/')
//   }
//   next();
// }

export const isUserLoggedIn = (req, res, next) => {
  console.log("Authenticated:", req.isAuthenticated());
  console.log("User:", req.user);

  if (req.isAuthenticated()) {
      return next();
  }
  req.flash('error', 'Please log in to view that resource');
  res.redirect('/login');
};

export const isGuest = (req, res, next) => {
  if (req.user && req.user.role === 'guest') {
      req.flash('error', 'Guest users do not have permission to perform this action.');
      return res.redirect('/');
  }
  next();
};
