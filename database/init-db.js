db.createUser(
    {
        user: 'my-meeting',
        pwd: 'JRva33nJganDXFoavYXoYeZB',
        roles: [
            {
                role: 'readWrite', db: 'my-meeting-db'
            }
        ]
    }
);
