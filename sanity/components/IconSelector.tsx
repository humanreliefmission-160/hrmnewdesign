// sanity/components/IconSelector.tsx
import React, { useCallback, useMemo, useState } from 'react'
import { set, StringInputProps } from 'sanity'
import { Stack, Text, TextInput, Grid, Card, Flex } from '@sanity/ui'
import * as FaIcons from 'react-icons/fa'  // Font Awesome 5
import * as Fa6Icons from 'react-icons/fa6' // Font Awesome 6
import * as MdIcons from 'react-icons/md' // Material Design
import * as HiIcons from 'react-icons/hi' // Hero Icons
import * as BsIcons from 'react-icons/bs' // Bootstrap Icons
import * as GiIcons from 'react-icons/gi' // Game Icons
import * as PiIcons from 'react-icons/pi' // Phosphor Icons
import * as BiIcons from 'react-icons/bi' // BoxIcons
import * as SiIcons from 'react-icons/si' // Simple Icons
import * as IoIcons from 'react-icons/io5' // Ionicons 5
import * as TbIcons from 'react-icons/tb' // Tabler Icons
import * as RiIcons from 'react-icons/ri' // Remix Icons
// Add more icon sets as you like

// Merge all icons into one big map
const allIcons: Record<string, React.ComponentType<{ size?: number }>> = {
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

const iconNames = Object.keys(allIcons).sort()

export default function IconSelector(props: StringInputProps) {
  const { value, onChange, elementProps } = props
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return iconNames.slice(0, 100) // show first 100
    const s = search.toLowerCase()
    return iconNames.filter(name => name.toLowerCase().includes(s)).slice(0, 50)
  }, [search])

  const handleSelect = useCallback(
    (name: string) => {
      onChange(set(name))
    },
    [onChange]
  )

  const SelectedIcon = value ? allIcons[value] : null

  return (
    <Stack gap={3}>
      {/* Display currently selected icon */}
      {value && SelectedIcon && (
        <Card padding={3} border>
          <Flex align="center" gap={3}>
            <SelectedIcon size={24} />
            <Text size={2} weight="semibold">{value}</Text>
          </Flex>
        </Card>
      )}

      {/* Search input */}
      <TextInput
        {...elementProps}
        value={value ?? ''}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // If the user types manually, just save as string
          onChange(set(e.target.value))
          setSearch(e.target.value)
        }}
        placeholder="Search for an icon (e.g. FaHandHoldingHeart)"
      />

      {/* Search results */}
      {search && (
        <Grid gridTemplateColumns={[3, 4, 6]} gap={2}>
          {filtered.map(name => {
            const Icon = allIcons[name]
            return (
              <Card
                key={name}
                padding={3}
                radius={2}
                shadow={1}
                tone={value === name ? 'positive' : 'default'}
                style={{ cursor: 'pointer' }}
                onClick={() => handleSelect(name)}
              >
                <Flex direction="column" align="center" gap={2}>
                  <Icon size={20} />
                  <Text size={0} align="center" style={{ wordBreak: 'break-word' }}>
                    {name}
                  </Text>
                </Flex>
              </Card>
            )
          })}
        </Grid>
      )}
      {search && filtered.length === 0 && (
        <Text size={1} muted>No icons found. Try a different search.</Text>
      )}
    </Stack>
  )
}
