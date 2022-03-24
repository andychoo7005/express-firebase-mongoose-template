const _ = require('lodash');
const moment = require('moment');
const { auth } = require('#helpers/firebase');
const User = require('#models/User.model');
const responses = require('#helpers/responses');
// const projections = require('#helpers/projections');

// const getSession = async (userId, lastActiveTime) => {
//   const userLastActiveTime = await rtdb.ref(`/session/${userId}`).get({
//     lastActiveTime,
//   });

//   return userLastActiveTime.val();
// };

// const setSession = async (session, firebaseUser) => {
//   const { uid, iat } = firebaseUser;

//   if (_.isEmpty(session?.lastActiveTime.toString())) {
//     await rtdb.ref(`/session/${uid}`).set({
//       lastActiveTime: iat,
//     });

//     return;
//   }

//   console.log('session:', session);
//   const sessionTime = moment.unix(session.lastActiveTime).toDate();
//   const difference = moment().diff(moment(sessionTime), 'minutes');
//   console.log('difference:', difference);

//   // define the session expiry duration.
//   if (difference >= 30) {
//     await auth.revokeRefreshTokens(uid);
//     await rtdb.ref(`/session/${uid}`).set({
//       lastActiveTime: '',
//     });
//     throw responses.failure('Session is over. Please login again to continue!');
//   } else {
//     await rtdb.ref(`/session/${uid}`).set({
//       lastActiveTime: moment().unix(),
//     });
//   }
// };

const isLoggedIn = async (req, res, next) => {
  const bearerHeader = req.headers.authorization;

  console.log(bearerHeader);

  try {
    if (typeof bearerHeader === 'undefined') {
      return res.status(401).send(
        responses.failure('Unauthenticated', null, 401),
      );
    }

    const firebaseUser = await auth.verifyIdToken(bearerHeader);
    req.uid = firebaseUser.uid;

    // const session = await getSession(firebaseUser.uid, firebaseUser.exp);
    // await setSession(session, firebaseUser);

    if (!req.uid) {
      return res.status(401).send(
        responses.failure('UID not found', null, 401),
      );
    }

    req.user = await User.findOne({
      uid: req.uid,
    },
      // projections.userProjection
    );

    if (!req.user) {
      return res.status(401).send(
        responses.failure('User data not found', { register: true }, 401),
      );
    }

    const clonedUser = _.cloneDeep(req.user);

    req.user = {
      ...clonedUser.toJSON(),
      id: clonedUser._id.toString(),
      countryCode: clonedUser.countryCode,
      phoneNumber: clonedUser.phoneNumber,
    };
  } catch (e) {
    return res.status(500).send(responses.exception(e.message, e.code));
  }

  return next();
};

module.exports = isLoggedIn;
