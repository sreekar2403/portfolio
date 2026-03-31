import { FaGithub, FaLinkedinIn } from 'react-icons/fa6'
import { HiOutlineMail } from 'react-icons/hi'
import { TbNotes } from 'react-icons/tb'
import { PERSONAL } from '../data/constants'

export default function SocialIcons() {
  return (
    <div className="social-sidebar">
      <a
        href={PERSONAL.github}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        aria-label="GitHub"
      >
        <FaGithub />
      </a>
      <a
        href={PERSONAL.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn />
      </a>
      <a
        href={`mailto:${PERSONAL.email}`}
        data-cursor="hover"
        aria-label="Email"
      >
        <HiOutlineMail />
      </a>
      <a
        href={PERSONAL.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="hover"
        aria-label="Resume"
        className="!text-[0.65rem] !font-mono !font-bold !tracking-[0.15em] !uppercase"
      >
        <TbNotes />
      </a>
    </div>
  )
}
