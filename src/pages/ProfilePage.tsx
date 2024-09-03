import { SubmitHandler, useForm } from 'react-hook-form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import '../assets/ProfilePage.scss';
import userAvatar from '../assets/imgs/genericAvatar.jpg';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

const ProfilePage = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((r) => setTimeout(r, 1000));
      console.log(data);
    } catch (error) {
      setError('root', {
        message: 'This email is already taken',
      });
    }
  };

  return (
    <form className="d-flex flex-column align-items-center gap-2" onSubmit={handleSubmit(onSubmit)}>
      <Image src={userAvatar} id="userAvatar" roundedCircle />
      <input {...register('email')} type="text" placeholder="Email" />
      {errors.email && <div className="">{errors.email.message}</div>}
      <input {...register('password')} type="password" placeholder="Password" />
      {errors.password && <div className="">{errors.password.message}</div>}
      <Button className="btn btn-primary" disabled={isSubmitting} id="profilePageButton" type="submit">
        {isSubmitting ? 'Loading...' : 'Submit'}
      </Button>
      {errors.root && <div>{errors.root.message}</div>}
    </form>
  );
};

export default ProfilePage;
