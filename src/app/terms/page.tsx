export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of Service for Get Geeky',
}

export default function TermsPage() {
    return (
        <div className="min-h-screen py-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="font-display text-5xl font-bold mb-8 text-gradient">
                    Terms of Service
                </h1>

                <div className="prose prose-invert max-w-none space-y-8">
                    <div className="bg-card border border-border rounded-lg p-8">
                        <div className="space-y-6 text-muted-foreground">
                            <p className="text-lg">Last updated: {new Date().toLocaleDateString()}</p>

                            <h2 className="text-2xl font-bold text-foreground">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Get Geeky, you accept and agree to be bound by these Terms of Service.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">2. Use License</h2>
                            <p>
                                Permission is granted to view and share articles for personal, non-commercial use only.
                                This does not include:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Modifying or copying the materials</li>
                                <li>Using the materials for commercial purposes</li>
                                <li>Removing copyright or proprietary notations</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground">3. Content Disclaimer</h2>
                            <p>
                                Get Geeky explores conspiracy theories, emerging science, and psychological concepts.
                                Content is for informational purposes and should not be considered professional advice.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">4. User Conduct</h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Use the site for illegal purposes</li>
                                <li>Attempt to gain unauthorized access</li>
                                <li>Interfere with site functionality</li>
                                <li>Harass other users</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground">5. Intellectual Property</h2>
                            <p>
                                All content, including articles, images, and graphics, is the property of Get Geeky or
                                its content suppliers and is protected by copyright laws.
                            </p>

                            <h2 className="text-2xl font-bold text-foreground">6. Limitation of Liability</h2>
                            <p>
                                Get Geeky shall not be liable for any damages arising from the use or inability to use
                                the materials on our site.
                            </p>


                            <h2 className="text-2xl font-bold text-foreground">7. DMCA & Copyright Policy</h2>
                            <p>
                                Get Geeky respects the intellectual property rights of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please contact us at <a href="mailto:legal@getgeeky.blog" className="text-neon-cyan hover:underline">legal@getgeeky.blog</a> with the following information:
                            </p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>A description of the copyrighted work</li>
                                <li>The location of the infringing material on our site</li>
                                <li>Your contact information</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-foreground">8. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify these terms at any time. Continued use of the site
                                constitutes acceptance of modified terms.
                            </p>

                            <div className="mt-8 pt-8 border-t border-border">
                                <p className="text-sm">
                                    Questions about these terms?{' '}
                                    <a href="mailto:legal@getgeeky.blog" className="text-neon-cyan hover:underline">
                                        legal@getgeeky.blog
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
