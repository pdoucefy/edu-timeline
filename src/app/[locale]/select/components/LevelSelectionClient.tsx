'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import { Button } from '@/components/common/Button.tsx';
import { Card } from '@/components/common/Card.tsx';
import { Page } from '@/components/common/Page.tsx';
import { Typography } from '@/components/common/Typography.tsx';
import {
  type SelectionDescriptor,
  resolveSelectedChapters,
  serializeChapters,
} from '@/game/resolveSelectedChapters.ts';
import type { DifficultyLevel, ID, SchoolYear } from '@/types';

/* ------------------------------------------------------------------ */
/*  Styled components                                                 */
/* ------------------------------------------------------------------ */
const Section = styled.section(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.md};
  `,
);

const ChapterGrid = styled.div(
  ({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: ${theme.spacing.sm};
  `,
);

const ChapterButton = styled.button<{ $active: boolean; $disabled?: boolean }>(
  ({ theme, $active, $disabled }) => css`
    padding: ${`${theme.spacing.sm} ${theme.spacing.md}`};
    border-radius: ${theme.radii.md};
    border: 1px solid ${$active ? theme.colors.primary : theme.colors.border};
    background: ${$active ? theme.colors.primaryMuted : theme.colors.surface};
    color: ${$active ? theme.colors.primary : theme.colors.text};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: ${$disabled ? 'not-allowed' : 'pointer'};
    opacity: ${$disabled ? 0.5 : 1};
    pointer-events: ${$disabled ? 'none' : 'auto'};
    transition: all 0.15s ease;

    &:hover {
      background: ${() => {
        if ($disabled) return undefined;
        return $active ? theme.colors.primaryMuted : theme.colors.surfaceHover;
      }};
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  `,
);

const ModeToggleGroup = styled(ToggleGroup.Root)(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.sm};
    flex-wrap: wrap;
  `,
);

const ModeToggle = styled(ToggleGroup.Item)<{ $pressed: boolean }>(
  ({ theme, $pressed }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.xs};
    padding: ${`${theme.spacing.md} ${theme.spacing.lg}`};
    border-radius: ${theme.radii.round};
    border: 1px solid ${$pressed ? theme.colors.primary : theme.colors.border};
    background: ${$pressed ? theme.colors.primaryMuted : theme.colors.surface};
    color: ${$pressed ? theme.colors.primary : theme.colors.text};
    font-weight: ${theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover {
      background: ${$pressed ? theme.colors.primaryMuted : theme.colors.surfaceHover};
    }

    &[data-state='on'] {
      background: ${theme.colors.primaryMuted};
      color: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
    }

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }
  `,
);

const DifficultyRadioGroup = styled(RadioGroup.Root)(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.spacing.sm};
  `,
);

const DifficultyItem = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
  `,
);

const DifficultyRadio = styled(RadioGroup.Item)(
  ({ theme }) => css`
    width: 1.25rem;
    height: 1.25rem;
    border-radius: ${theme.radii.round};
    border: 2px solid ${theme.colors.borderStrong};
    background: ${theme.colors.surface};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus-visible {
      outline: 2px solid ${theme.colors.primary};
      outline-offset: 2px;
    }

    &[data-state='checked'] {
      border-color: ${theme.colors.primary};
    }
  `,
);

const DifficultyIndicator = styled(RadioGroup.Indicator)(
  ({ theme }) => css`
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: ${theme.radii.round};
    background: ${theme.colors.primary};
    margin: auto;
  `,
);

const DifficultyLabel = styled.label<{ $active: boolean }>(
  ({ theme, $active }) => css`
    color: ${$active ? theme.colors.primary : theme.colors.text};
    cursor: pointer;
  `,
);

const ModeToggleContent = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.xs};
  `,
);

const ModeToggleDescription = styled.span(
  ({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.textMuted};
    text-align: center;
  `,
);

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

type ChapterItemProps = {
  chapterId: ID;
  label: string;
  active: boolean;
  disabled?: boolean;
  onSelect: (id: ID) => void;
};

const ChapterItem = ({
  chapterId,
  label,
  active,
  disabled = false,
  onSelect,
}: ChapterItemProps) => {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onSelect(chapterId);
    }
  }, [onSelect, chapterId, disabled]);

  return (
    <ChapterButton
      $active={active}
      $disabled={disabled}
      disabled={disabled}
      onClick={handleClick}
      aria-pressed={active}
      aria-disabled={disabled}
    >
      {label}
    </ChapterButton>
  );
};

type YearSectionProps = {
  year: SchoolYear;
  selectedYearId: ID | null;
  selectedChapterNumber: number | null;
  disabled?: boolean;
  onSelectChapter: (yearId: ID, chapterNumber: number) => void;
};

const YearSection = ({
  year,
  selectedYearId,
  selectedChapterNumber,
  disabled = false,
  onSelectChapter,
}: YearSectionProps) => {
  const t = useTranslations('select');

  const handleSelect = useCallback(
    (chapterId: ID) => {
      if (disabled) return;
      const chapter = year.chapters.find((c) => c.id === chapterId);
      if (chapter) {
        onSelectChapter(year.id, chapter.chapterNumber);
      }
    },
    [year, onSelectChapter, disabled],
  );

  return (
    <Card>
      <Typography $variant="h3">
        {t('yearLabel')} {year.year}
      </Typography>
      <ChapterGrid>
        {year.chapters.map((chapter) => {
          const active =
            selectedYearId === year.id && selectedChapterNumber === chapter.chapterNumber;
          return (
            <ChapterItem
              key={chapter.id}
              chapterId={chapter.id}
              label={t('chapterLabel', { number: chapter.chapterNumber })}
              active={active}
              disabled={disabled}
              onSelect={handleSelect}
            />
          );
        })}
      </ChapterGrid>
    </Card>
  );
};

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export type LevelSelectionClientProps = {
  years: SchoolYear[];
  locale: string;
};

export const LevelSelectionClient = ({ years, locale }: LevelSelectionClientProps) => {
  const t = useTranslations('select');
  const router = useRouter();

  const [mode, setMode] = useState<'single' | 'summary' | 'forFun'>('single');
  const [selectedYearId, setSelectedYearId] = useState<ID | null>(null);
  const [selectedChapterNumber, setSelectedChapterNumber] = useState<number | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');

  const handleChapterClick = useCallback(
    (yearId: ID, chapterNumber: number) => {
      setSelectedYearId(yearId);
      setSelectedChapterNumber(chapterNumber);
      // If for-fun was active, switch back to single when a chapter is explicitly picked.
      if (mode === 'forFun') {
        setMode('single');
      }
    },
    [mode],
  );

  const handleModeChange = useCallback((value: string) => {
    if (!value) return; // prevent unselecting the active mode
    if (value === 'summary') {
      setMode('summary');
    } else if (value === 'forFun') {
      setMode('forFun');
      setSelectedYearId(null);
      setSelectedChapterNumber(null);
    } else {
      setMode('single');
    }
  }, []);

  const handleDifficultyChange = useCallback((value: string) => {
    setDifficulty(value as DifficultyLevel);
  }, []);

  const handleStart = useCallback(() => {
    let selection: SelectionDescriptor;

    if (mode === 'forFun') {
      selection = { mode: 'forFun' };
    } else if (selectedYearId !== null && selectedChapterNumber !== null) {
      selection =
        mode === 'summary'
          ? { mode: 'summary', yearId: selectedYearId, chapterNumber: selectedChapterNumber }
          : { mode: 'single', yearId: selectedYearId, chapterNumber: selectedChapterNumber };
    } else {
      // Nothing selected yet — do not navigate.
      return;
    }

    const chapters = resolveSelectedChapters(years, selection);
    const ids = serializeChapters(chapters);

    // URL contract consumed by the /play route (Task 21):
    //   /[locale]/play?chapters=<comma-separated numeric IDs>&difficulty=<easy|hard>
    const query = new URLSearchParams({
      chapters: ids.join(','),
      difficulty,
    });

    router.push(`/${locale}/play?${query.toString()}`);
  }, [mode, selectedYearId, selectedChapterNumber, difficulty, years, locale, router]);

  const canStart = mode === 'forFun' || (selectedYearId !== null && selectedChapterNumber !== null);

  if (years.length === 0) {
    return (
      <Page>
        <Typography $variant="h1" $centered>
          {t('title')}
        </Typography>
        <Typography $variant="light" $centered>
          {t('noChaptersAvailable')}
        </Typography>
      </Page>
    );
  }

  return (
    <Page>
      <Typography $variant="h1" $centered>
        {t('title')}
      </Typography>

      {/* Mode toggles */}
      <Section>
        <Typography $variant="h2">{t('mode')}</Typography>
        <ModeToggleGroup
          type="single"
          value={mode}
          onValueChange={handleModeChange}
          aria-label={t('mode')}
        >
          <ModeToggle value="single" $pressed={mode === 'single'} aria-pressed={mode === 'single'}>
            <ModeToggleContent>
              <span>{t('standardToggle')}</span>
              <ModeToggleDescription>{t('standardDescription')}</ModeToggleDescription>
            </ModeToggleContent>
          </ModeToggle>
          <ModeToggle
            value="summary"
            $pressed={mode === 'summary'}
            aria-pressed={mode === 'summary'}
          >
            <ModeToggleContent>
              <span>{t('summaryToggle')}</span>
              <ModeToggleDescription>{t('summaryDescription')}</ModeToggleDescription>
            </ModeToggleContent>
          </ModeToggle>
          <ModeToggle value="forFun" $pressed={mode === 'forFun'} aria-pressed={mode === 'forFun'}>
            <ModeToggleContent>
              <span>{t('forFunToggle')}</span>
              <ModeToggleDescription>{t('forFunDescription')}</ModeToggleDescription>
            </ModeToggleContent>
          </ModeToggle>
        </ModeToggleGroup>
      </Section>

      {/* Chapter list grouped by year */}
      <Section>
        <Typography $variant="h2">{t('title')}</Typography>
        {years.map((year) => (
          <YearSection
            key={year.id}
            year={year}
            selectedYearId={selectedYearId}
            selectedChapterNumber={selectedChapterNumber}
            disabled={mode === 'forFun'}
            onSelectChapter={handleChapterClick}
          />
        ))}
      </Section>

      {/* Difficulty selector */}
      <Section>
        <Typography $variant="h2">{t('difficulty')}</Typography>
        <DifficultyRadioGroup
          value={difficulty}
          onValueChange={handleDifficultyChange}
          aria-label={t('difficulty')}
        >
          <DifficultyItem>
            <DifficultyRadio value="easy" id="diff-easy">
              <DifficultyIndicator />
            </DifficultyRadio>
            <DifficultyLabel htmlFor="diff-easy" $active={difficulty === 'easy'}>
              {t('difficultyEasy')}
            </DifficultyLabel>
          </DifficultyItem>
          <DifficultyItem>
            <DifficultyRadio value="hard" id="diff-hard">
              <DifficultyIndicator />
            </DifficultyRadio>
            <DifficultyLabel htmlFor="diff-hard" $active={difficulty === 'hard'}>
              {t('difficultyHard')}
            </DifficultyLabel>
          </DifficultyItem>
        </DifficultyRadioGroup>
      </Section>

      <Button
        $variant="primary"
        onClick={handleStart}
        disabled={!canStart}
        aria-disabled={!canStart}
      >
        {t('startGame')}
      </Button>
    </Page>
  );
};
