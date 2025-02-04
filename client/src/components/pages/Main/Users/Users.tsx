import  {useEffect, useState} from 'react';
import {getUsers} from "@/app/api.ts";

const Users = () => {
    const [users, setUsers] = useState<[]>([])

    useEffect( () => {
        const fetchUsers = async () => {
            try {
                const usersResponse = await getUsers();
                setUsers(usersResponse);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, [])

    const usersHandler = async () => {
        try {
            const usersResponse = await getUsers();
            setUsers(usersResponse);
        } catch (e) {
            console.error(e);
        }
    }

    console.log(...users)

    return (
        <div>
            <button onClick={usersHandler}>Получить пользователей</button>
        </div>
    );
};

export default Users;