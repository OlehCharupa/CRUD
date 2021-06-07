export const composeUsers = (users) => {
    const isArray = users instanceof Array;
    if (isArray) {
        return users.map(composeUser);
    }

    return composeUser(users);
}

const composeUser = (user) => {
    return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profiles: [...user.profiles]
    };
}

