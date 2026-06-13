// app/[locale]/lib/icons/IconRenderer.tsx
import React from 'react'
import * as FaIcons from 'react-icons/fa'
import * as Fa6Icons from 'react-icons/fa6'
import * as MdIcons from 'react-icons/md'
import * as HiIcons from 'react-icons/hi'
import * as BsIcons from 'react-icons/bs'
import * as GiIcons from 'react-icons/gi'
import * as PiIcons from 'react-icons/pi'
import * as BiIcons from 'react-icons/bi'
import * as SiIcons from 'react-icons/si'
import * as IoIcons from 'react-icons/io5'
import * as TbIcons from 'react-icons/tb'
import * as RiIcons from 'react-icons/ri'

const allIcons: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  ...FaIcons,
  ...Fa6Icons,
  ...MdIcons,
  ...HiIcons,
  ...BsIcons,
  ...GiIcons,
  ...PiIcons,
  ...BiIcons,
  ...SiIcons,
  ...IoIcons,
  ...TbIcons,
  ...RiIcons,
}

interface IconRendererProps {
  name: string
  size?: number
  className?: string
}

export default function IconRenderer({ name, size = 16, className }: IconRendererProps) {
  if (!name) return null
  const Icon = allIcons[name]
  if (!Icon) {
    // If name is an emoji (e.g. 🥘, 🏥), render it directly as text
    if (name.length <= 4) {
      return <span style={{ fontSize: size }} className={className}>{name}</span>
    }
    // Fallback icon
    const Fallback = FaIcons.FaRegQuestionCircle
    return <Fallback size={size} className={className} />
  }
  return <Icon size={size} className={className} />
}
