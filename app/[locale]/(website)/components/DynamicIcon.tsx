"use client";

import React, { useEffect, useState } from 'react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
  color?: string;
  fill?: string;
}

export default function DynamicIcon({ name, className, size = 30, color, fill }: DynamicIconProps) {
  const [iconState, setIconState] = useState<{ icon: React.ComponentType<any> | null }>({ icon: null });

  useEffect(() => {
    if (!name) return;

    const prefix = name.substring(0, 2).toLowerCase();
    let promise: Promise<any>;

    switch (prefix) {
      case 'fa':
        promise = import('react-icons/fa6');
        break;
      case 'md':
        promise = import('react-icons/md');
        break;
      case 'hi':
        promise = import('react-icons/hi');
        break;
      case 'bs':
        promise = import('react-icons/bs');
        break;
      case 'gi':
        promise = import('react-icons/gi');
        break;
      case 'pi':
        promise = import('react-icons/pi');
        break;
      case 'bi':
        promise = import('react-icons/bi');
        break;
      case 'si':
        promise = import('react-icons/si');
        break;
      case 'io':
        promise = import('react-icons/io5');
        break;
      case 'fa6':
        promise = import('react-icons/fa6');
        break;
      case 'tb':
        promise = import('react-icons/tb');
        break;
      case 'ri':
        promise = import('react-icons/ri');
        break;
      default:
        promise = import('react-icons/fa6');
    }

    promise
      .then((mod) => {
        if (mod && mod[name]) {
          setIconState({ icon: mod[name] as React.ComponentType<any> });
        } else {
          // If not found in the prefixed set, try searching FontAwesome 6 then FontAwesome 5 as fallback
          import('react-icons/fa6').then((fa6Mod) => {
            if (fa6Mod && fa6Mod[name]) {
              setIconState({ icon: fa6Mod[name] as React.ComponentType<any> });
            } else {
              import('react-icons/fa').then((faMod) => {
                if (faMod && faMod[name]) {
                  setIconState({ icon: faMod[name] as React.ComponentType<any> });
                }
              });
            }
          });
        }
      })
      .catch((err) => {
        console.error(`Failed to load icon ${name}:`, err);
      });
  }, [name]);

  const IconComponent = iconState.icon;
  const iconColor = color || fill || "#650199";

  if (!IconComponent) {
    // Return a default checkmark SVG while loading/fallback
    return (
      <svg
        className={className}
        width={size}
        height={size}
        fill={iconColor}
        viewBox="0 0 24 24"
      >
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    );
  }

  return <IconComponent className={className} size={size} color={iconColor} />;
}
