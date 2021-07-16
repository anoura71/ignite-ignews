import { NextApiRequest, NextApiResponse } from 'next';

export default (request: NextApiRequest, response: NextApiResponse) => {
  const { params } = request.query;

  const users = [
    { id: 1, name: 'Um' },
    { id: 2, name: 'Dois' },
    { id: 3, name: 'Tres' },
  ];

  return response.json(users);
}
